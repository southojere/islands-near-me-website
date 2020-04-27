import React from "react";
import { gql } from "apollo-boost";
import { get } from "lodash";
import { useQuery } from "@apollo/react-hooks";
import {
  ReloadOutlined,
  PlusCircleOutlined,
  SearchOutlined
} from "@ant-design/icons";
import { Select, Input } from "antd";

import SessionCard from "./components/SessionCard";
import SessionModal from "./components/CreateSessionModal";
import {
  Header,
  PageWrapper,
  ListWrapper,
  CustomPagination,
  ActionContainer,
  IconWrapper,
  CustomSelect,
  FilterContainer,
  Text
} from "./styles";
import config from "../../config";

const SESSIONS_QUERY = gql`
  query sessions($filter: SessionSearchInput!) {
    listSessions(filter: $filter) {
      total
      sessions {
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
  }
`;

const IslandsNearMe = () => {
  // page state
  const [filterState, setFilterState] = React.useState({
    type: "NEARME"
  });

  // pagination filters
  const [page, setPage] = React.useState(1);

  const [displaySessionModel, setModal] = React.useState(false);
  const { loading, data, error, refetch } = useQuery(SESSIONS_QUERY, {
    variables: {
      filter: {
        skip: (page - 1) * config.query.limit,
        limit: config.query.limit
      }
    }
  });

  //   const { total, sessions } = data ? data : { total: 0, sessions: [] };
  const { total, sessions } = get(data, "listSessions", {
    total: 0,
    sessions: []
  });
  return (
    <PageWrapper>
      <Header>
        <h2 style={{ textAlign: "center" }}>Islands Near Me</h2>
        <ActionContainer>
          <IconWrapper>
            <SearchOutlined
              title="Apply search"
              style={{ fontSize: "24px" }}
              onClick={() => setModal(true)}
            />
          </IconWrapper>
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
      <FilterContainer>
        <CustomSelect
          defaultValue="NEAR ME"
          style={{ width: 120 }}
          onChange={val => {
            setFilterState({ ...filterState, type: val });
          }}
        >
          <Select.Option value={"NEAR ME"}>NEAR ME</Select.Option>
          <Select.Option value={"ALL"}>ALL</Select.Option>
        </CustomSelect>
        <div>
          <Input placeholder="Search" className="secondary-color" />
        </div>
      </FilterContainer>

      <br />
      <br />
      {loading ? (
        <Text>Loading islands near you...</Text>
      ) : (
        <ListWrapper>
          {sessions &&
            sessions.map(session => {
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

          {error && <p>{`>.< ${error.toString()}`}</p>}
        </ListWrapper>
      )}
      <CustomPagination
        simple
        defaultCurrent={page}
        current={page}
        total={total}
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
