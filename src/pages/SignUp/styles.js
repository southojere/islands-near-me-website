import styled from "styled-components";
import { Form, Button } from "antd";

const PageWrapper = styled.div`
  background: #e4e8b7;
  border-radius: 35px;
  padding: 2rem;
`;

const FormWrapper = styled(Form)`
  .login-form {
    max-width: 250px;
    width: 100%;
  }
`;

const SignUpButton = styled(Button)`
  border-radius: 25px;
  width: 100%;
  background: #67bc65;
  border: none;
  height: 34px;
  &:hover,
  &:focus {
    background: #48ae46;
    border: none;
  }
`;

const Header = styled.h2`
  text-align: center;
  color: #67bc65;
`;

export { PageWrapper, FormWrapper, SignUpButton, Header };
