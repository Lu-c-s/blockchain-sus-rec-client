import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Switch } from "antd";
import "./LoginPage.css";

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
              checkedChildren="Patient"
              unCheckedChildren="Provider"
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
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NormalLoginForm;
