import styled from "styled-components";
import { CloseCircleTwoTone } from "@ant-design/icons";

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
  transition: all .5s;
  &:hover {
    transform: scale(1.2)
  }
`;

const VisitorContainer = styled.div`
    margin-bottom:.5rem;
`

export { CardContainer, CloseIcon,VisitorContainer };
