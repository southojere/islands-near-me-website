import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";
import { get } from "lodash";
import { WifiOutlined } from "@ant-design/icons";
import { Button, Badge } from "antd";

import { HomeIcon } from "./styles";

import { AppDrawer } from "./components/AppDrawer";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
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
  padding-left: 1rem;
  padding-right: 1rem;
`;

const LIST_MY_REQUESTS = gql`
  query listRequests {
    listRequests {
      id
      status {
        label
        code
      }
      session {
        dodoCode
        isPrivate
        note
        host {
          id
          username
          islandName
        }
      }
      message
    }
  }
`;

const Layout = props => {
  const history = useHistory();
  const [displayDrawer, setDrawerVisible] = React.useState(false);
  const date = new Date();

  const { data } = useQuery(LIST_MY_REQUESTS);
  const requests = get(data, "listRequests", []);

  //   const activeSession = get(data, "me.session");

  const showDrawer = () => {
    setDrawerVisible(true);
  };
  const onClose = () => {
    setDrawerVisible(false);
  };

  return (
    <div>
      <Header>
        <span>
          <HomeIcon onClick={() => history.push("/")} />
        </span>
        <span>
          {date.toLocaleTimeString("en-AU", {
            hour: "numeric",
            hour12: true,
            minute: "numeric"
          })}
        </span>
        <WifiOutlined />
      </Header>
      {/* <RenderSessionActions /> */}
      {requests.length > 0 && (
        <AppDrawer
          onClose={onClose}
          showDrawer={showDrawer}
          visible={displayDrawer}
          requests={requests}
        >
          <Button>
            <Badge
              count={requests ? requests.length : 0}
              style={{ backgroundColor: "#ee9f6e" }}
            />
            &nbsp; Join Requests
          </Button>
        </AppDrawer>
      )}
      <Margin>{props.children}</Margin>
    </div>
  );
};

export default Layout;
