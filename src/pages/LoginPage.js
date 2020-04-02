import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Switch } from "antd";
import "./LoginPage.css";

const USER_TYPE = {
  PATIENT: true,
  PROVIDER: false
};

const NormalLoginForm = props => {
  const onFinish = values => {
    console.log("Received values of form: ", values);
  };

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

        <Form.Item name="user">
          <div
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <Switch
              checkedChildren="Paciente"
              unCheckedChildren="Provedor"
              checked={props.currentUser}
              onChange={() => props.setUserType(!props.currentUser)}
            />
          </div>
        </Form.Item>
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
              props.currentUser === USER_TYPE.PATIENT ? "/patient" : "/provider"
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
