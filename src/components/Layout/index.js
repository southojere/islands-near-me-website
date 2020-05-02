import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";
import { get } from "lodash";
import { useMutation } from "@apollo/react-hooks";
import { WifiOutlined, DeleteOutlined } from "@ant-design/icons";

import { HomeIcon } from "./styles";
import { getUser } from "../../helpers/local-storage";
import { Button, Tooltip } from "antd";

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
      }
    }
  }
`;

const DELETE_SESSION = gql`
  mutation($id: Int!) {
    deleteSession(id: $id)
  }
`;

const Layout = props => {
  const history = useHistory();
  const date = new Date();

  const [deleteSession, { loading }] = useMutation(DELETE_SESSION);
  const { data } = useQuery(ME);

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
        <div>
          {activeSession && (
            <>
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
            </>
          )}
        </div>
      </Header>
      <Margin>{props.children}</Margin>
    </div>
  );
};

export default Layout;
