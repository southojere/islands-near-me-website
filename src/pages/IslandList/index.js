import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import {
  Header,
  PageWrapper,
  ListWrapper,
  CustomPagination,
  ActionContainer,
  IconWrapper
} from "./styles";
import SessionCard from "./components/SessionCard";
import { ReloadOutlined, PlusCircleOutlined } from "@ant-design/icons";
import SessionModal from "./components/CreateSessionModal";

const SESSIONS_QUERY = gql`
  query sessions {
    listSessions {
      id
      note
      hostId
      dodoCode
      latitude
      longitude
      host {
        id
        username
        email
      }
    }
  }
`;

const IslandsNearMe = () => {
  // page state
  const [limit] = React.useState(20);
  const [page, setPage] = React.useState(1);

  const [displaySessionModel, setModal] = React.useState(false);
  const { loading, data, refetch} = useQuery(SESSIONS_QUERY);


  return (
    <PageWrapper>
        {console.log(loading)}
      <Header>
        <h2 style={{ textAlign: "center" }}>Islands Near Me</h2>
        <ActionContainer>
          <IconWrapper onClick={() => refetch()}>
            <ReloadOutlined style={{ fontSize: "24px" }} spin={loading} />
          </IconWrapper>
          <IconWrapper>
            <PlusCircleOutlined
              style={{ fontSize: "24px" }}
              onClick={() => setModal(true)}
            />
          </IconWrapper>
        </ActionContainer>
      </Header>

      {!loading && (
        <ListWrapper>
          {data.listSessions.map(session => {
            const { id, note, dodoCode, hostId, host } = session;
            return (
              <SessionCard
                key={`session-card-${id}`}
                id={id}
                note={note}
                dodoCode={dodoCode}
                host={hostId}
                refetch={refetch}
                owner={host}
              />
            );
          })}
        </ListWrapper>
      )}
      <CustomPagination
        simple
        defaultCurrent={page}
        total={50}
        onChange={page => {
          refetch();
          setPage(page);
        }}
      />
      <SessionModal
        opened={displaySessionModel}
        onCancel={() => setModal(false)}
        onComplete={() => {
          refetch();
          setModal(false);
        }}
      />
    </PageWrapper>
  );
};

export default IslandsNearMe;
