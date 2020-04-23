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
import { getUser } from "../../helpers/local-storage";

const SESSIONS_QUERY = gql`
  query sessions {
    listSessions {
      id
      note
      hostId
      dodoCode
      latitude
      longitude
    }
  }
`;

const IslandsNearMe = () => {
  // page state
  const [limit] = React.useState(20);
  const [page, setPage] = React.useState(1);
  const [nextToken, setNextToken] = React.useState(null);

  // util/helper state
  const [refetchCount, setRefetchCount] = React.useState(0);
//   const [loading, setLoading] = React.useState(true);
  const [displaySessionModel, setModal] = React.useState(false);

  // data
  const currentUser = getUser();
  const { loading, error, data } = useQuery(SESSIONS_QUERY);
  const [sessions, setSessions] = React.useState([]);

  React.useEffect(() => {
    // setLoading(true);
    // Promise.all([
    //   API.graphql(
    //     graphqlOperation(listSessions, {
    //       limit,
    //       nextToken
    //     })
    //   )
    // ])
    //   .then(([{ data }]) => {
    //     const { listSessions } = data;
    //     setSessions(listSessions.items);
    //     setNextToken(listSessions.nextToken);
    //   })
    //   .finally(() => setLoading(false));
    // // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, refetchCount]);

  const refetch = () => setRefetchCount(refetchCount + 1);

  return (
    <PageWrapper>
      <Header>
        <h2 style={{ textAlign: "center" }}>Islands Near Me</h2>
        <ActionContainer>
          <IconWrapper onClick={refetch}>
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
            const { id, note, dodoCode, hostId } = session;
            return (
              <SessionCard
                key={`session-card-${id}`}
                id={id}
                note={note}
                dodoCode={dodoCode}
                host={hostId}
                currentUser={currentUser}
                refetch={refetch}
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
