import React from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";
import { Form, Input, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { PageWrapper, FormWrapper, SignUpButton, Header } from "./styles";

const SIGNUP = gql`
  mutation($input: RegisterInput!) {
    signUp(input: $input) {
      id
      username
      email
    }
  }
`;

const Signup = () => {
  const [signUpMutation, { loading }] = useMutation(SIGNUP);
  const history = useHistory();
  const [notification, setNotification] = React.useState({
    message: "",
    type: "success"
  });

  return (
    <PageWrapper>
      <Header>Sign up</Header>
      {notification.message && (
        <Alert
          message={notification.message}
          type={notification.type}
          showIcon
        />
      )}
      <br />
      <FormWrapper
        name="normal_login"
        className="login-form"
        onFinish={async values => {
          //   setLoading(true);
          await signUpMutation({
            variables: {
              input: {
                email: values.email,
                password: values.password,
                username: values.username
              }
            }
          }).catch(e => {
            setNotification({
              message: e.toString(),
              type: "error"
            });
          });
          setTimeout(() => {
            history.push("/login");
          }, 3000);
          setNotification({
            message: "Done! You will shortly be navigated to the login page.",
            type: "success"
          });
        }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username~" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email~" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password~" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <SignUpButton type="primary" htmlType="submit" loading={loading}>
            Sign Up
          </SignUpButton>
        </Form.Item>
        <span>
          {" "}
          Or{" "}
          <Link to={"/login"} style={{ color: "#67bc65" }}>
            login now!
          </Link>
        </span>
      </FormWrapper>
    </PageWrapper>
  );
};

export default Signup;
