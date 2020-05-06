import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import Web3 from "web3";
import System from "../abis/System.json";

const { Header, Content, Footer, Sider } = Layout;

const PatientPage = (props) => {
  const [Collapsed, setCollapsed] = useState(false);
  const [patientData, setPatientData] = useState();

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  useEffect(() => {
    (async function loadAllData() {
      await loadWeb3();
      await getPatientInfo();
    })();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const getPatientInfo = async () => {
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const networkData = System.networks[networkId];
    const accounts = await web3.eth.getAccounts();

    if (networkData) {
      const patientControl = new web3.eth.Contract(
        System.abi,
        networkData.address
      );

      let data = await patientControl.methods.pacientes(accounts[0]).call();
      setPatientData(data);
    }
  };

  console.log(patientData);
  const { userProntuario } = patientData || {};
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={Collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1">
            <PieChartOutlined />
            <span>Dados pessoais</span>
          </Menu.Item>
          {/*<Menu.Item onClick={() => alert("Em desenvolvimento")}>
            <DesktopOutlined />
            <span>Registros médicos</span>
          </Menu.Item>*/}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            Nome:{userProntuario ? userProntuario.name : ""}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default PatientPage;
