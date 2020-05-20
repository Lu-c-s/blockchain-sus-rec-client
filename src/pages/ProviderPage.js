import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { Form, Input, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import Web3 from "web3";
import Paciente from "../abis/Paciente.json";
import EthCrypto from "eth-crypto";

const { Header, Content, Footer, Sider } = Layout;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const ProviderPage = ({ ...props }) => {
  const [Collapsed, setCollapsed] = useState(false);
  const [account, setAccount] = useState("");

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

  const encryptData = async (publicKey, data) => {
    //Encrypt data using the public key
    let encrypted = await EthCrypto.encryptWithPublicKey(publicKey, data);

    //return the message as one string
    return EthCrypto.cipher.stringify(encrypted);
  };

  const signToPatientContract = async (values) => {
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const networkData = Paciente.networks[networkId];
    const accounts = await web3.eth.getAccounts();

    //Create a new public/private key pair
    const newAccount = web3.eth.accounts.create();

    const userPublicKey = EthCrypto.publicKeyByPrivateKey(
      newAccount.privateKey
    );

    setAccount({
      publicKey: userPublicKey,
      privateKey: newAccount.privateKey,
    });
    //Encrypt all objects from values object
    for (var key in values) {
      if (values.hasOwnProperty(key)) {
        values[key] = await encryptData(userPublicKey, values[key]);
      }
    }

    const nDoProntuario = await encryptData(userPublicKey, "XXXXXXXXXXX");

    if (networkData) {
      const patientFactory = new web3.eth.Contract(
        Paciente.abi,
        networkData.address
      );

      console.log(patientFactory);

      let valuesArray = Object.values(values);

      patientFactory.methods
        .AdicionarPaciente(newAccount.address, [...valuesArray, nDoProntuario])
        .send({ from: accounts[0] });

      /* patientFactory.methods
        .AdicionarPacientePersonal1(
          newAccount.address,
          values.name,
          values.cpf,
          values.rg,
          values.nome_social,
          values.dt_nasc,
          values.sexo,
          values.cor_raca,
          values.nacionalidade
        )
        .send({
          from: accounts[0],
        })
        .once("receipt", (receipt) => {
          console.log("receipt", receipt);
        });

      const patientFactory2 = web3.eth.Contract(
        Paciente.abi,
        networkData.address
      );
      patientFactory.methods
        .AdicionarPacientePersonal2(
          newAccount.address,
          values.municipio,
          values.telefone,
          values.email,
          values.pais,
          values.cep,
          values.estado,
          values.orientacao_sexual,
          values.identidade_de_genero
        )
        .send({
          from: accounts[0],
        })
        .once("receipt", (receipt) => {
          console.log("receipt", receipt);
        });

      const patientFactory3 = web3.eth.Contract(
        Paciente.abi,
        networkData.address
      );
      patientFactory.methods
        .AdicionarPacienteAddress1(
          newAccount.address,
          values.bairro,
          values.logradouro,
          values.numero,
          values.complemento,
          values.referencia,
          values.area,
          values.microarea
        )
        .send({
          from: accounts[0],
        })
        .once("receipt", (receipt) => {
          console.log("receipt", receipt);
        });

      const patientFactory4 = web3.eth.Contract(
        Paciente.abi,
        networkData.address
      );
      patientFactory.methods
        .AdicionarPacienteOthers(
          newAccount.address,
          values.nome_da_mae,
          values.nome_do_pai,
          values.estado_civil,
          values.NIS_PIS_PASEP,
          nDoProntuario, // Número do prontuario vindo do CADSUS
          values.ocupacao,
          values.escolaridade,
          values.tipo_sanguineo
        )
        .send({
          from: accounts[0],
        })
        .once("receipt", (receipt) => {
          console.log("receipt", receipt);
        });    */
    }
  };

  const [form] = Form.useForm();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={Collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1">
            <QuestionCircleOutlined />
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
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={signToPatientContract}
              scrollToFirstError
            >
              Dados Pessoais
              <Form.Item name="name" label={<span>Nome completo&nbsp;</span>}>
                <Input />
              </Form.Item>
              <Form.Item name="cpf" label="CPF">
                <Input style={{ width: "70%" }} />
              </Form.Item>
              <Form.Item name="rg" label="RG">
                <Input style={{ width: "70%" }} />
              </Form.Item>
              <Form.Item name="nome_social" label="Nome Social">
                <Input style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="dt_nasc" label="Data de Nascimento">
                <Input style={{ width: "50%" }} />
              </Form.Item>
              <Form.Item name="sexo" label="Sexo">
                <Input style={{ width: "50%" }} />
              </Form.Item>
              <Form.Item name="cor_raca" label="Cor/Raça">
                <Input style={{ width: "50%" }} />
              </Form.Item>
              <Form.Item name="nacionalidade" label="Nacionalidade">
                <Input style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="telefone" label="Telefone">
                <Input style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="email" label="E-mail">
                <Input style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="orientacao_sexual" label="Orientação sexual">
                <Input style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                name="identidade_de_genero"
                label="Identidade de gênero"
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="nome_da_mae" label="Nome da mãe">
                <Input style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="nome_do_pai" label="Nome do pai">
                <Input style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="estado_civil" label="Estado civil">
                <Input style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="NIS_PIS_PASEP" label="Número do NIS/PIS/PASEP">
                <Input style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="ocupacao" label="Ocupação">
                <Input style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="escolaridade" label="Escolaridade">
                <Input style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="tipo_sanguineo" label="Tipo Sanguineo">
                <Input style={{ width: "100%" }} />
              </Form.Item>
              Endereço
              <Form.Item name="pais" label="País">
                <Input style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="municipio" label="Municipio">
                <Input style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="estado" label="Estado">
                <Input style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="bairro" label="Bairro">
                <Input style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="logradouro" label="Logradouro">
                <Input style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="numero" label="Número">
                <Input style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="cep" label="CEP">
                <Input style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="complemento" label="Complemento">
                <Input style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="referencia" label="Referência">
                <Input style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="area" label="Área">
                <Input style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="microarea" label="Microárea">
                <Input style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Registar novo paciente
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div>
            <h2>Generated Keys: </h2>
            <p>public = {account.publicKey}</p>
            <p>private = {account.privateKey}</p>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
    </Layout>
  );
};

export default ProviderPage;
