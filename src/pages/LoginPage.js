import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Web3 from "web3";
import "./LoginPage.css";
import Portis from "@portis/web3";
import System from "../abis/System.json";

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

  const loadUserAccount = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
  };

  return (
    <div className="login-page">
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          position: "absolute",
          top: 50,
          left: 0,
        }}
      >
        <h1>SusRec</h1>
      </div>
    </div>
  );
};

export default NormalLoginForm;
