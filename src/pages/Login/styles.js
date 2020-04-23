import styled from "styled-components";
import { Form, Button } from "antd";

const PageWrapper = styled.div`
    background:white;
    border-radius:35px;
    padding:2rem;
`
const FormWrapper = styled(Form)`
  .login-form {
    max-width: 250px;
    width: 100%;
  }
`;

const SignUpButton = styled(Button)`
  width: 100%;
`;

const Header = styled.h2`
  text-align: center;
`;

export { PageWrapper, FormWrapper, SignUpButton, Header };
