import styled from "styled-components";
import TextArea from "antd/lib/input/TextArea";
import { Button } from "antd";

const PageWrapper = styled.div`
  background: #dcf9ec;
  border-radius: 35px;
  padding: 1.5rem;
  background-image: radial-gradient(#1ad9b5 1.5px, transparent 1.5px),
    radial-gradient(#1ad9b5 1.5px, transparent 1.5px);
  background-size: calc(20 * 1.5px) calc(20 * 1.5px);
  background-position: 0 0, calc(10 * 1.5px) calc(10 * 1.5px);
`;

const FeedBackTextArea = styled(TextArea)`
  border-radius: 10px;
`;

const FeedbackSubmitButton = styled(Button)`
  border-radius: 25px;
  width: 100%;
  background: #1ad9b5;
  border: none;
  height: 34px;
  &:hover,
  &:focus {
    background: #15bf9f;
    border:none;
  }
`;
export { PageWrapper, FeedBackTextArea, FeedbackSubmitButton };
