import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import {
  PieChartOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import Web3 from "web3";
import System from "../abis/System.json";


const { Header, Content, Footer, Sider } = Layout;

const ProviderPage = ({ account , ...props}) => {
  const [Collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    (async function loadAllData() {
      await loadWeb3();    
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


  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  
  const createUserAccount = async () => {
    const web3 = window.web3;
    const createdAccount = await web3.eth.accounts.create()
    return createdAccount;
  }

  const signToPatientContract = async (userAddress, data) => {
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const networkData = System.networks[networkId];
    const accounts = await web3.eth.getAccounts();

    if (networkData) {
      const patientFactory = web3.eth.Contract(
        System.abi,
        networkData.address
      );

      console.log(patientFactory)

      patientFactory.methods
      .AdicionarPaciente(accounts[0],"Leticia")
      .send({ from: accounts[0] })
      .once("receipt", (receipt) => {
        console.log("receipt",receipt)        
      });
    }
  }

  const createNewPatient = async (data) => {
    //let account = await createUserAccount()
    await signToPatientContract("",data)
  }

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
  
      //let info = await patientControl.methods
      //.addName("sakura").send({ from : accounts[0]});
      
      //console.log(info)

      let userName = await patientControl.methods
      .pacientes(accounts[0]).call();

      console.log("usr",userName)
    }
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={Collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1">
            <PieChartOutlined />
            <span>Adicionar paciente</span>
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
            <Button onClick={createNewPatient}>Criar novo paciente</Button>
            <Button onClick={getPatientInfo}>Information</Button>
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
