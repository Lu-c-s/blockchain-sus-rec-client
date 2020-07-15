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
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
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
      alert("Login ou senha incorreto");
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

        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Usuário"
            name="username"
            rules={[
              {
                required: true,
                message: "Por favor coloque o nome de usuário!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Senha"
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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default NormalLoginForm;
