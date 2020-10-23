import React, { useEffect, useState } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, Redirect, useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import Web3 from "web3";
import "./LoginPage.css";

const NormalLoginForm = (props) => {
  const history = useHistory();

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

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  };
  const tailLayout = {
    wrapperCol: { offset: 0, span: 0 },
  };

  const onFinish = async (values) => {
    const response = await fetch("/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values }),
    });

    if (response.status === 200) {
      history.push("/patient");
    } else {
      alert("Chave privada não cadastrada");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-page">
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          flexDirection: "column",
          top: 50,
          left: 0,
        }}
      >
        <h1 style={{ marginBottom: 60 }}>
          Sistema de Prontuário em Blockchain
        </h1>

        <div
          style={{
            display: `flex`,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 60,
          }}
        >
          <h1 style={{ fontSize: 40, marginBottom: -10 }}>RDS</h1>
          <h2>Rede Distruibuída de Saúde</h2>
        </div>

        <Form
          {...layout}
          name="basic"
          style={{ display: "flex", justifyContent: "center" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Chave privada"
            name="password"
            rules={[
              {
                required: true,
                message: "Por favor coloque a sua senha!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="secondary" htmlType="submit">
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default NormalLoginForm;
