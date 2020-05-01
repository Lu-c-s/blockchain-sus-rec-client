import React, { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import PatientPage from "./pages/PatientPage";
import ProviderPage from "./pages/ProviderPage";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Web3 from "web3";
import Patient from "./abis/Patient.json";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

const USER_TYPE = {
  PATIENT: true,
  PROVIDER: false,
};

function App() {
  const [user, setUser] = useState(USER_TYPE.PATIENT);
  const [patients, setPatients] = useState([]);
  const [account, setAccount] = useState(null);
  const [patientControl, setPatientControl] = useState(null);

  useEffect(() => {
    (async function loadAllData() {
      await loadWeb3();
      await loadBlockchainData();
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

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    console.log("acc", accounts);
    setAccount(accounts[0]);

    const networkId = await web3.eth.net.getId();
    const networkData = Patient.networks[networkId];
    console.log("net", networkData);
    if (networkData) {
      const patientControl = web3.eth.Contract(
        Patient.abi,
        networkData.address
      );

      console.log("obj patient", patientControl);
      setPatientControl(patientControl);
      const patientCount = await patientControl.methods.patientCount().call();

      // Load patients
      for (var i = 1; i <= patientCount; i++) {
        const patient = await patientControl.methods.patients(i).call();
        setPatients((prevArray) => [...prevArray, patient]);
      }
    } else {
      window.alert("Patient contract not deployed to detected network.");
    }
  };

  const createPatient = ({ name, cpf }) => {
    patientControl.methods
      .addPatient(name, cpf)
      .send({ from: account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  };

  console.log(patients);

  return (
    <div className="App">
      <div>{"account :" + account}</div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={createPatient}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Nome"
          />
        </Form.Item>
        <Form.Item
          name="cpf"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="CPF"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>

      <div>
        {"Users"}

        {patients.map((pt, i) => {
          return <p key={i}>{"Name: " + pt.name + " -- cpf: " + pt.cpf}</p>;
        })}
      </div>

      {/*<BrowserRouter>
        <Switch>
          <Route path="/patient">
            <PatientPage />
          </Route>
          <Route path="/provider">
            <ProviderPage />
          </Route>
          <Route path="/">
            <LoginPage
              setUserType={(user) => setUser(user)}
              currentUser={user}
            />
          </Route>
        </Switch>
      </BrowserRouter>*/}
    </div>
  );
}

export default App;
