import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Web3 from "web3";
import "./LoginPage.css";

const NormalLoginForm = (props) => {
  const ganacheNode = {
    nodeUrl: "https://localhost:7545",
    chainId: 5777,
  };

  /*const portis = new Portis(
    "4b237b61-fc07-4bbb-9e7c-517aceef660e",
    ganacheNode
  );
  const web3 = new Web3(portis.provider);*/

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
        <h1>Sistema de Prontuário em Blockchain</h1>

        <div
          style={{
            display: "flex",
            width: "100%",
            height: 450,
            justifyContent: "space-around",
            alignItems: "center",
            position: "absolute",
            flexDirection: "row",

            top: 50,
            left: 0,
          }}
        >
          <Link to="/patient">
            <Button size="large">
              {" "}
              <UserOutlined />
              Paciente
            </Button>
          </Link>
          <Link to="/provider">
            <Button size="large">
              {" "}
              <LockOutlined />
              Profissional da saúde
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NormalLoginForm;
