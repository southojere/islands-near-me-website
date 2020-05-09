import styled from "styled-components";
import { HomeOutlined } from "@ant-design/icons";

const HomeIcon = styled(HomeOutlined)`
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const SessionActions = styled.div`
  > button {
    margin-left: 1rem;
  }
`;

export { HomeIcon, SessionActions };
