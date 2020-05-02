import React, { useEffect} from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import Patient from "../abis/Patient.json";

const NormalLoginForm = ({ setAccount, account, setPatientData, patientData, ...props}) => {
  
  useEffect(() => {
    (async function loadAllData() {
      await loadUserAccount();
      await getPatientData();
    })();
  }, []);

  
  const onFinish = values => {
    console.log("Received values of form: ", values);
  };

  const loadUserAccount = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts ? accounts[0] : null)
  }

  
  const getPatientData = async () => {
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const networkData = Patient.networks[networkId];

    const accounts = await web3.eth.getAccounts();
    let userAccount = accounts[0]

    if (networkData) {
      const patientControl = web3.eth.Contract(
        Patient.abi,
        networkData.address
      );

        const patient = await patientControl.methods.patients(userAccount).call();
        if(patient){
          setPatientData(patient)          
        } else {

        }
        
      }
  }
  console.log(props)
  return (
    <div className="login-page">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            position: "absolute",
            top: 50,
            left: 0
          }}
        >
          <h1>SusRec</h1>
        </div>        
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="N do CNS"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Senha"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Lembrar-me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot">Esqueci minha senha</a>
        </Form.Item>

        <Form.Item>
          <Link
            to={`${
               "/patient"
            }`}
          >
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Link>
          Ou <a href="">Registre-se aqui!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NormalLoginForm;
