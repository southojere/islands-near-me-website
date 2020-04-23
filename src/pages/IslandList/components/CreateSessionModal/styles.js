import styled from "styled-components";
import { Form } from "antd";

const FormItem = styled(Form.Item)`
  margin: 0;
  width: 100%;
`;

const LocationWrapper = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  width: 100%;
  height: 100%;
  padding-top: 1rem;
  cursor: pointer;
`;

const LocationLabel = styled.span`
  padding-left: 1rem;
  color: ${props => props.error && "red"};
`;

const Disclaimer = styled.div`
text-align:center;
  font-size: 12px;
  color: grey;
  margin-top: 0.5rem;
`;

export { FormItem, LocationWrapper, LocationLabel, Disclaimer };
