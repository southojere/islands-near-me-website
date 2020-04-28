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
  LoaderWrapper
} from "./styles";
import config from "../../config";
import { getUser } from "../../helpers/local-storage";
import Loader from "../../components/Loader";

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
  const currentUser = getUser();
  // page state
  const [listType, setListType] = React.useState("NEARME");
  const [searchText, setSearchText] = React.useState("");

  // pagination filters
  const [page, setPage] = React.useState(1);
  const [keyword, setKeyword] = React.useState("");

  const [displaySessionModel, setModal] = React.useState(false);
  const { loading, data, error, refetch } = useQuery(SESSIONS_QUERY, {
    variables: {
      filter: {
        skip: (page - 1) * config.query.limit,
        limit: config.query.limit,
        keyword
      }
    }
  });

  const { total, sessions } = get(data, "listSessions", {
    total: 0,
    sessions: []
  });

  const onSearch = () => {
    setKeyword(searchText);
  };

  const RenderActions = () => {
    return (
      <ActionContainer>
        <IconWrapper>
          <SearchOutlined
            title="Apply search"
            style={{ fontSize: "24px" }}
            onClick={() => onSearch()}
          />
        </IconWrapper>
        <IconWrapper onClick={() => refetch()}>
          <ReloadOutlined style={{ fontSize: "24px" }} spin={loading} />
        </IconWrapper>
        {currentUser && (
          <IconWrapper>
            <PlusCircleOutlined
              style={{ fontSize: "24px" }}
              onClick={() => setModal(true)}
            />
          </IconWrapper>
        )}
      </ActionContainer>
    );
  };

  const RenderContentBody = () => {
    if (loading) {
      return (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      );
    }

    return (
      <>
        <ListWrapper>
          {sessions.map(session => {
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

        <CustomPagination
          simple
          current={page}
          defaultCurrent={1}
          total={total}
          pageSize={config.query.limit}
          onChange={page => {
            setPage(page);
            refetch();
          }}
        />
      </>
    );
  };

  return (
    <PageWrapper>
      <Header>
        <h2 style={{ textAlign: "center" }}>Islands Near Me</h2>
        <RenderActions />
      </Header>
      <FilterContainer>
        <CustomSelect
          defaultValue="ALL"
          style={{ width: 120 }}
          onChange={val => {
            setListType(val);
          }}
        >
          <Select.Option value={"NEAR ME"}>NEAR ME</Select.Option>
          <Select.Option value={"ALL"}>ALL</Select.Option>
        </CustomSelect>
        <div>
          <Input
            placeholder="Search username or dodocode"
            className="secondary-color"
            onChange={({ target: { value } }) => {
              setSearchText(value);
            }}
          />
        </div>
      </FilterContainer>
      <br />
      <RenderContentBody />
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
