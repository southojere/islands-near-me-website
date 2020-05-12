import React from "react";
import { gql } from "apollo-boost";
import { withApollo } from "react-apollo";
import {
  ReloadOutlined,
  PlusCircleOutlined,
  SearchOutlined
} from "@ant-design/icons";
import { Select, Slider, Col, Row, Radio } from "antd";

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
  LoaderWrapper,
  EmptyComponent,
  RadioContainer,
  TitleContainer,
  Disclaimer
} from "./styles";
import config from "../../config";
import { getUser } from "../../helpers/local-storage";
import Loader from "../../components/Loader";
import {
  SESSION_FILTERS,
  DEFAULT_SEARCH_RADIUS,
  MAX_SEARCH_DISTANCE,
  VISITORS,
  TABLET_THRESHOLD_WIDTH
} from "../../constants";
import useWindowSize from "../../hooks/useWindow";

const SESSIONS_QUERY = gql`
  query sessions($filter: SessionSearchInput!) {
    listSessions(filter: $filter) {
      total
      sessions {
        id
        note
        hostId
        dodoCode
        isFull
        latitude
        longitude
        host {
          id
          username
          email
        }
        hasCeleste
        hasSaharah
        hasKicks
        hasRedd
        hasLeif
        createdAt
      }
    }
  }
`;

const IslandsNearMe = ({ client }) => {
  const currentUser = getUser();
  const [refetchCount, setRefetchCount] = React.useState(0);
  const [width] = useWindowSize();
  const [page, setPage] = React.useState(1);

  const reducer = (state, newState) => ({ ...state, ...newState });
  const [searchFields, setSearchState] = React.useReducer(reducer, {
    currentLocation: {
      latitude: null,
      longitude: null
    },
    keyword: "",
    listType: SESSION_FILTERS.ALL.VALUE,
    searchRadius: DEFAULT_SEARCH_RADIUS,
    visitor: null
  });

  const [pageState, setPageState] = React.useReducer(reducer, {
    loading: true,
    total: 0,
    sessions: [],
    error: ""
  });
  const { loading, total, sessions, error } = pageState;

  const [displaySessionModel, setModal] = React.useState(false);

  React.useEffect(() => {
    setPageState({
      loading: true
    });
    client
      .query({
        query: SESSIONS_QUERY,
        variables: {
          filter: {
            skip: (page - 1) * config.query.limit,
            limit: config.query.limit,
            keyword: searchFields.keyword,
            searchType: searchFields.listType,
            nearMeRadius: searchFields.searchRadius,
            latitude: searchFields.currentLocation.latitude,
            longitude: searchFields.currentLocation.longitude,
            visitor: searchFields.visitor
          }
        },
        fetchPolicy: "network-only"
      })
      .then(({ data: { listSessions } }) => {
        if (listSessions) {
          const { sessions, total } = listSessions;
          setPageState({
            total,
            sessions,
            loading: false
          });
        }
      })
      .catch(error => {
        setPageState({
          loading: false,
          error: error.toString()
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchCount]);

  const refetch = () => {
    setRefetchCount(refetchCount + 1);
  };

  const onSearch = () => {
    refetch();
  };

  const fetchLocation = () => {
    navigator.geolocation.getCurrentPosition(
      res => {
        const {
          coords: { latitude, longitude }
        } = res;
        setSearchState({
          currentLocation: {
            latitude: `${latitude}`,
            longitude: `${longitude}`
          }
        });
      },
      res => {}
    );
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
            const { id, note, dodoCode, hostId, host, createdAt } = session;
            return (
              <SessionCard
                key={`session-card-${id}`}
                id={id}
                note={note}
                dodoCode={dodoCode}
                host={hostId}
                refetch={refetch}
                owner={host}
                createdAt={createdAt}
                {...session}
              />
            );
          })}
          {sessions.length === 0 && (
            <EmptyComponent description="No Sessions found" />
          )}

          {error && (
            <>
              <br />
              <p>{`>.< ${error}`}</p>
            </>
          )}
        </ListWrapper>
        <br />
        {searchFields.listType !== SESSION_FILTERS.NEARME.VALUE &&
          sessions.length > 0 && (
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
          )}
      </>
    );
  };

  return (
    <PageWrapper>
      <Header>
        <TitleContainer>
          <h2 style={{ textAlign: "center" }}>Islands</h2>
          {width > TABLET_THRESHOLD_WIDTH && (
            <Disclaimer>
              Sessions have a life span of 2 hours before it is automatically
              removed.
            </Disclaimer>
          )}
        </TitleContainer>
        <RenderActions />
      </Header>
      <FilterContainer>
        <CustomSelect
          defaultValue="ALL"
          style={{ width: 120 }}
          onChange={val => {
            setSearchState({ listType: val });
            if (val === SESSION_FILTERS.NEARME.VALUE) {
              fetchLocation();
            }
          }}
        >
          <Select.Option value={SESSION_FILTERS.NEARME.VALUE}>
            NEAR ME
          </Select.Option>
          <Select.Option value={SESSION_FILTERS.ALL.VALUE}>ALL</Select.Option>
        </CustomSelect>
        {searchFields.listType === SESSION_FILTERS.NEARME.VALUE && (
          <div>
            <p>Select your distance: ({searchFields.searchRadius} km)</p>
            <Slider
              tipFormatter={value => `${value} km`}
              max={MAX_SEARCH_DISTANCE}
              onChange={val => setSearchState({ searchRadius: val })}
              style={{ width: "100%" }}
              defaultValue={searchFields.searchRadius}
            />
          </div>
        )}
        {/* {searchFields.listType !== SESSION_FILTERS.NEARME.VALUE && (
          <div>
            <Input
              placeholder="Search username or dodocode"
              className="secondary-color"
              onChange={({ target: { value } }) => {
                setSearchState({ keyword: value });
              }}
            />
          </div>
        )} */}
      </FilterContainer>
      <br />
      <RadioContainer>
        <Radio.Group
          onChange={({ target: { value } }) => {
            setSearchState({
              visitor: value
            });
          }}
          value={searchFields.visitor}
        >
          <Row>
            <Col sm={8} xs={12}>
              <Radio value={VISITORS.CELESTE.VALUE}>
                {VISITORS.CELESTE.TEXT}
              </Radio>
            </Col>
            <Col sm={8} xs={12}>
              <Radio value={VISITORS.SAHARAH.VALUE}>
                {VISITORS.SAHARAH.TEXT}
              </Radio>
            </Col>
            <Col sm={8} xs={12}>
              <Radio value={VISITORS.KICKS.VALUE}>{VISITORS.KICKS.TEXT}</Radio>
            </Col>
            <Col sm={8} xs={12}>
              <Radio value={VISITORS.LEIF.VALUE}>{VISITORS.LEIF.TEXT}</Radio>
            </Col>
            <Col sm={8} xs={12}>
              <Radio value={VISITORS.REDD.VALUE}>{VISITORS.REDD.TEXT}</Radio>
            </Col>
          </Row>
        </Radio.Group>
      </RadioContainer>
      <br />

      <RenderContentBody />
      <SessionModal
        opened={displaySessionModel}
        onCancel={() => setModal(false)}
        onComplete={() => {
          setModal(false);
          window.location.reload();
        }}
      />
    </PageWrapper>
  );
};

export default withApollo(IslandsNearMe);
