import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Link, useHistory } from "react-router-dom";
import { Form, Input, Alert } from "antd";
import {
  UserOutlined,
  LockOutlined,
  ConsoleSqlOutlined
} from "@ant-design/icons";

import { FormWrapper, SignUpButton, Header, PageWrapper } from "./styles";
import { setUser } from "../../helpers/local-storage";

const LOGIN_USER = gql`
  mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      email
    }
  }
`;

const Login = () => {
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const [loginUser] = useMutation(LOGIN_USER);
  const [error, setError] = React.useState("");

  return (
    <PageWrapper>
      <Header>Login</Header>
      {error && (
        <>
          <Alert message="Error" description={error} type="error" showIcon />
        </>
      )}
      <br />
      <FormWrapper
        name="normal_login"
        className="login-form"
        onFinish={async values => {
          setLoading(true);
          const res = await loginUser({
            variables: {
              username: values.username,
              password: values.password
            }
          }).catch(e => {
            setError(e.toString());
          });
          const {
            data: { login }
          } = res;
          if (login && login.id) {
            setUser(login);
            history.push("/");
          }
          setLoading(false);
        }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username ~ " }]}
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
          <SignUpButton type="primary" htmlType="submit" loading={loading}>
            Login
          </SignUpButton>
        </Form.Item>
        <span>
          {" "}
          Or <Link to={"/signup"}>Register here</Link>
        </span>
      </FormWrapper>
    </PageWrapper>
  );
};

export default Login;
