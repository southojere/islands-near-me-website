import styled from "styled-components";
import { CloseCircleTwoTone } from "@ant-design/icons";
import { Button } from "antd";

const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 80px;
  background: ${({ theme }) => theme.colors.secondary.default};
  border-radius: 30px;
  text-align: center;
  margin-bottom: 1rem;
  padding: 1rem;
  &:hover {
    background: repeating-linear-gradient(
      -45deg,
      #f6d476,
      #f6d476 10px,
      #fbc16e 10px,
      #fbc16e 20px
    );
  }
`;

const CloseIcon = styled(CloseCircleTwoTone)`
  position: absolute;
  top: 0;
  right: -3px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    transform: scale(1.2);
  }
`;

const VisitorContainer = styled.div``;

const Badge = styled.span`
  border-radius: 5px;
  padding: 3px;
  background: #ff3643;
  color: white;
`;

const RequestButton = styled(Button)`
  margin-left: 5px;
`;

export { CardContainer, CloseIcon, VisitorContainer, Badge, RequestButton };
