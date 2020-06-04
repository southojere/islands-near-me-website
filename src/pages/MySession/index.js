import React from "react";
import { get } from "lodash";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";

import {
  PageWrapper,
  PageHeader,
  Icon,
  AlignLeftContainer,
  Text
} from "./style";
import JoinRequests from "./components/JoinRequests";
import Loader from "../../components/Loader";
import SessionDetails from "./components/SessionDetails";
import { SESSION_REQUEST_STATUS } from "../../constants";

const ME = gql`
  query me {
    me {
      session {
        id
        dodoCode
        note
        isFull
        hasCeleste
        hasSaharah
        hasKicks
        hasRedd
        hasLeif
        sessionRequests {
          id
          message
          createdAt
          status {
            label
            code
          }
          user {
            id
            username
            islandName
          }
        }
      }
    }
  }
`;

const Session = props => {
  const { data, loading, refetch } = useQuery(ME, {
    pollInterval: 10000
  });

  const session = get(data, "me.session", null);

  const DisplayBody = () => {
    if (loading) {
      return (
        <AlignLeftContainer>
          <Loader color={"#58b3a8"} />
        </AlignLeftContainer>
      );
    } else if (!loading && !session) {
      return (
        <Text align="center" margin={[10, 0, 10, 0]}>
          You don't have a active current session
        </Text>
      );
    }

    const pendingRequests = session.sessionRequests.filter(
      req => req.status.code === SESSION_REQUEST_STATUS.PENDING_RESPONSE
    );
    return (
      <>
        <SessionDetails session={session} refetch={refetch} />
        <br />
        <JoinRequests sessionRequests={pendingRequests} refetch={refetch} />
        <br />
      </>
    );
  };

  return (
    <PageWrapper>
      <PageHeader>
        <Icon marginRight={1} icon={faPlaneDeparture} />
        Flight Information
      </PageHeader>
      <DisplayBody />
    </PageWrapper>
  );
};

export default Session;
