import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";
import { get } from "lodash";
import { useMutation } from "@apollo/react-hooks";
import {
  WifiOutlined,
  DeleteOutlined,
  ControlOutlined
} from "@ant-design/icons";

import { HomeIcon, SessionActions } from "./styles";
import { Button, Tooltip } from "antd";
import Loader from "../Loader";

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

const ME = gql`
  query me {
    me {
      id
      username
      session {
        id
        dodoCode
        isFull
      }
    }
  }
`;

const DELETE_SESSION = gql`
  mutation($id: Int!) {
    deleteSession(id: $id)
  }
`;

const MARK_SESSION_FULL = gql`
  mutation($id: Int!) {
    toggleSessionFull(id: $id) {
      id
      dodoCode
      note
      hostId
      isFull
    }
  }
`;

const Layout = props => {
  const history = useHistory();
  const date = new Date();

  const [deleteSession, { loading }] = useMutation(DELETE_SESSION);
  const [toggleSessionFull, { loading: markFullLoading }] = useMutation(
    MARK_SESSION_FULL
  );
  const { data, loading: loadingUser } = useQuery(ME);

  const activeSession = get(data, "me.session");

  const handleDelete = () => {
    if (!activeSession) return;
    deleteSession({
      variables: {
        id: parseInt(activeSession.id)
      }
    })
      .then(() => {
        window.location.reload();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleMarkSessionFull = () => {
    toggleSessionFull({
      variables: {
        id: parseInt(activeSession.id)
      }
    })
      .then(() => {
        window.location.reload();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const RenderSessionActions = () => {
    if (loadingUser) {
      return <Loader></Loader>;
    }

    if (activeSession) {
      return (
        <SessionActions>
          <Tooltip
            placement="left"
            title={activeSession.isFull ? "Show dodo code" : "Hide dodo code"}
          >
            <Button
              onClick={handleMarkSessionFull}
              type="primary"
              shape="circle"
              icon={<ControlOutlined spin={markFullLoading} />}
            />
          </Tooltip>

          <Tooltip
            placement="left"
            title={`End Session ${activeSession.dodoCode}`}
          >
            <Button
              danger
              onClick={handleDelete}
              loading={loading}
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Tooltip>
        </SessionActions>
      );
    }
    return <div></div>;
  };

  return (
    <div>
      <Header>
        <span>
          <HomeIcon onClick={() => history.push("/")} /> <WifiOutlined />
        </span>
        <span>
          {date.toLocaleTimeString("en-AU", {
            hour: "numeric",
            hour12: true,
            minute: "numeric"
          })}
        </span>
        <RenderSessionActions />
      </Header>
      <Margin>{props.children}</Margin>
    </div>
  );
};

export default Layout;
