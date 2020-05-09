import styled from "styled-components";
import { Form, Button } from "antd";

const PageWrapper = styled.div`
  border-radius: 35px;
  padding: 2rem;
  background: #ccdbf5;
  background-image: radial-gradient(#8a9cf3 2px, transparent 2px),
    radial-gradient(#8a9cf3 2px, transparent 2px);
  background-size: calc(20 * 2px) calc(20 * 2px);
  background-position: 0 0, calc(10 * 2px) calc(10 * 2px);
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
  background: #8a9cf3;
  border: none;
  height: 34px;
  &:hover,
  &:focus {
    background: #8091e1;
    border: none;
  }
`;

const Header = styled.h2`
  text-align: center;
  color:#5772f3;
`;


export { PageWrapper, FormWrapper, SignUpButton, Header };
