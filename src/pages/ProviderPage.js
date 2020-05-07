import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import Web3 from "web3";
import System from "../abis/System.json";
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
    const networkData = System.networks[networkId];
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

    console.log(values);
    //Encrypt all objects from values object
    for (var key in values) {
      if (values.hasOwnProperty(key)) {
        values[key] = await encryptData(userPublicKey, values[key]);
      }
    }

    console.log("encrypted Data", values);

    if (networkData) {
      const patientFactory = web3.eth.Contract(System.abi, networkData.address);
      patientFactory.methods
        .AdicionarPaciente(newAccount.address, values.name)
        .send({
          from: accounts[0],
        })
        .once("receipt", (receipt) => {
          console.log("receipt", receipt);
        });
    }
  };

  const [form] = Form.useForm();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={Collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1">
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
              <Form.Item
                name="name"
                label={<span>Nome completo&nbsp;</span>}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              {/*}<Form.Item
                name="cpf"
                label="CPF"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                name="rg"
                label="RG"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                name="endereço"
                label="Endereço"
                rules={[
                  {
                    required: true,
                    message: "Please select your habitual residence!",
                  },
                ]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                name="sexo"
                label="Sexo"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                name="dt_nasc"
                label="Data de nascimento"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                name="cor"
                label="Cor/raça"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                name="mother_name"
                label="Nome da mãe"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                name="father_name"
                label="Nome do pai"
                rules={[
                  {
                    required: false,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                name="nacionality"
                label="Nacionalidade"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                name="municipio"
                label="Munícipio"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>*/}

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
