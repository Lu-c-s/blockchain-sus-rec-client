import React, { useState, useEffect } from "react";
import { Layout, Menu, Button } from "antd";
import { PieChartOutlined } from "@ant-design/icons";
import Web3 from "web3";
import Paciente from "../abis/Paciente.json";
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
    const networkData = Paciente.networks[networkId];

    if (networkData) {
      const patientControl = new web3.eth.Contract(
        Paciente.abi,
        networkData.address
      );

      if (key) {
        const publicKey = await EthCrypto.publicKeyByPrivateKey(key);
        const toAddress = EthCrypto.publicKey.toAddress(publicKey);

        let data = await patientControl.methods.pacientes(toAddress).call();

        console.log(data);
        let userProntuario = data;

        for (let field in userProntuario) {
          console.log(field);
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

        console.log("f", userProntuario);
        setPatientData(userProntuario);
      }
    }
  };

  const decryptData = async (privateKey, data) => {
    console.log("field data", data);
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
              {patientData && (
                <>
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
                  {Object.keys(patientData).length !== 0 ? (
                    <>
                      <h3>Dados Pessoais</h3>
                      <p>Name: {patientData.name}</p>
                      <p>CPF: {patientData.cpf}</p>
                      <p>RG: {patientData.rg}</p>
                      <p>Nome social: {patientData.nome_social}</p>
                      <p>Data de Nascimento: {patientData.dt_nasc}</p>
                      <p>Sexo: {patientData.sexo}</p>
                      <p>Cor/Raça: {patientData.cor_raca}</p>
                      <p>Nacionalidade: {patientData.nacionalidade}</p>
                      <p>Telefone: {patientData.telefone}</p>
                      <p>E-mail: {patientData.email}</p>
                      <p>Orientação Sexual: {patientData.orientacao_sexual}</p>
                      <p>
                        Identidade de Gênero: {patientData.identidade_de_genero}
                      </p>
                      <p>Nome da mãe: {patientData.nome_da_mae}</p>
                      <p>Nome do pai: {patientData.nome_do_pai}</p>
                      <p>Estado Civil: {patientData.estado_civil}</p>
                      <p>
                        Número do NIS/PIS/PASEP: {patientData.NIS_PIS_PASEP}
                      </p>
                      <p>Ocupação: {patientData.ocupacao}</p>
                      <p>Escolaridade: {patientData.escolaridade}</p>
                      <p>Tipo Sanguineo: {patientData.tipo_sanguineo}</p>

                      <h3>Endereço</h3>

                      <p>País: {patientData.pais}</p>
                      <p>Estado: {patientData.estado}</p>
                      <p>Municipio: {patientData.municipio}</p>
                      <p>Bairro: {patientData.bairro}</p>
                      <p>Logradouro: {patientData.logradouro}</p>
                      <p>Número: {patientData.numero}</p>
                      <p>CEP: {patientData.cep}</p>
                      <p>Complemento: {patientData.complemento}</p>
                      <p>Referência: {patientData.referencia}</p>
                      <p>Área: {patientData.area}</p>
                      <p>Microárea: {patientData.microarea}</p>
                    </>
                  ) : null}
                </>
              )}
            </div>
          </div>
        </Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
};

export default PatientPage;
