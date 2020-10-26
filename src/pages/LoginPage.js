import React, { useEffect, useState } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, Redirect, useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import Web3 from "web3";
import Paciente from "../abis/Paciente.json";
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

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Link to="/patient">
            <Button type="secondary" size="large" htmlType="submit">
              Paciente
            </Button>
          </Link>
          <Link to="/provider">
            <Button type="secondary" size="large" htmlType="submit">
              Profissional da saúde
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NormalLoginForm;
