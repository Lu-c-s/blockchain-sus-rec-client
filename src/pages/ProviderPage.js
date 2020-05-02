import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import Patient from "../abis/Patient.json";

const { Header, Content, Footer, Sider } = Layout;

const ProviderPage = ({ account , ...props}) => {
  const [Collapsed, setCollapsed] = useState(false);
  

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  const createUserAccount = async () => {
    const web3 = window.web3;

    const createdAccount = await web3.eth.accounts.create()
    console.log("created account",createdAccount)
    return createdAccount;
    
  }

  const signToPatientContract = async (data) => {
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const networkData = Patient.networks[networkId];

    if (networkData) {
      const patientControl = web3.eth.Contract(
        Patient.abi,
        networkData.address
      );
      const { name,cpf } = data

      patientControl.methods
      .addPatient(account, name,cpf)
      .send({ from: account })
      .once("receipt", (receipt) => {
        console.log("receipt",receipt)        
      });
    }
  }

  const createPatient = async (data) => {
   // let account = await createUserAccount()
    await signToPatientContract(data)
  }


  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={Collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1">
            <PieChartOutlined />
            <span>Dados pessoais</span>
          </Menu.Item>
          <Menu.Item key="2">
            <DesktopOutlined />
            <span>Registros</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            Patient Data
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default ProviderPage;
