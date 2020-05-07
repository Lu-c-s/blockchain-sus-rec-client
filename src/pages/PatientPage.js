import React, { useState, useEffect } from "react";
import { Layout, Menu, Button } from "antd";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import Web3 from "web3";
import System from "../abis/System.json";
import EthCrypto from "eth-crypto";

const { Header, Content, Footer, Sider } = Layout;

const PatientPage = (props) => {
  const [Collapsed, setCollapsed] = useState(false);
  const [patientData, setPatientData] = useState({});
  const [key, setKey] = useState("");

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

    if (networkData) {
      const patientControl = new web3.eth.Contract(
        System.abi,
        networkData.address
      );

      if (key) {
        const publicKey = await EthCrypto.publicKeyByPrivateKey(key);
        const toAddress = EthCrypto.publicKey.toAddress(publicKey);
        debugger;
        let data = await patientControl.methods.pacientes(toAddress).call();
        let { userProntuario } = data;
        console.log(userProntuario);
        for (let field in userProntuario) {
          if (
            userProntuario.hasOwnProperty(field) &&
            !Number.isInteger(+field) &&
            userProntuario[field] !== ""
          ) {
            userProntuario[field] = await decryptData(
              key,
              userProntuario[field]
            );
          } else {
            delete userProntuario[field];
          }
        }
        setPatientData(userProntuario);
      }
    }
  };

  const decryptData = async (privateKey, data) => {
    debugger;
    // get the encrypted object
    let ParsedData = EthCrypto.cipher.parse(data);

    //Decrypt the object using the private key
    return await EthCrypto.decryptWithPrivateKey(privateKey, ParsedData);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={Collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1">
            <PieChartOutlined />
            <span>Dados pessoais</span>
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
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p>Chave privada</p>
              <input
                value={key}
                style={{ width: 500 }}
                onChange={(event) => setKey(event.target.value)}
              />
              <Button
                style={{ width: 70, marginTop: 20 }}
                onClick={getPatientInfo}
              >
                Entrar
              </Button>
              {patientData && Object.keys(patientData).length !== 0 ? (
                <>
                  <p>Name: {patientData.name}</p>
                  <p>Cpf: {patientData.cpf}</p>
                </>
              ) : null}
            </div>
          </div>
        </Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
};

export default PatientPage;
