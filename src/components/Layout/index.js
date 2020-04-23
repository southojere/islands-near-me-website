import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { WifiOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { HomeIcon } from "./styles";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  width: 100vw;
  height: 60px;
  background: ${({ theme }) => theme.colors.secondary.default};
  font-size: 18px;
  a {
    margin-right: 1rem;
  }
`;

const Margin = styled.div`
  max-width: 900px;
  margin: auto;
  padding-top: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
`;

const Layout = props => {
  const history = useHistory();
  const date = new Date();
  return (
    <div>
      <Header>
        <span>
          <HomeIcon onClick={() => history.push("/")} /> <WifiOutlined />
        </span>
        <span>
          {date.toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: true,
            minute: "numeric"
          })}
        </span>
        <EnvironmentOutlined />
      </Header>
      <Margin>{props.children}</Margin>
    </div>
  );
};

export default Layout;
