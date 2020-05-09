import styled from "styled-components";
import { HomeOutlined } from "@ant-design/icons";

const HomeIcon = styled(HomeOutlined)`
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const SessionActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  background-image: radial-gradient(#e5c142 1px, #fef0bc 1px),
    radial-gradient(#e5c142 1px, #fef0bc 1px);
  background-size: calc(20 * 1px) calc(20 * 1px);
  background-position: 0 0, calc(10 * 1px) calc(10 * 1px);
  border-radius: 5px;

  .left {
    display: flex;
    width: 100%;
    align-items: center;
  }
`;

const SessionActions = styled.div`
  > button {
    margin-left: 1rem;
  }
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export { HomeIcon, SessionActions, SessionActionsWrapper };
