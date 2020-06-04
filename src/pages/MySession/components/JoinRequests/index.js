import React from "react";
import PropTypes from "prop-types";
import {
  faUser,
  faPlaneDeparture,
  faComment,
  faSignInAlt,
  faWindowClose,
  faCalendar
} from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { RequestContainer, Header, Actions, SizedBox } from "./style";
import { Icon } from "../../style";
import { Tooltip, Button, Empty } from "antd";
import { SESSION_REQUEST_STATUS } from "../../../../constants";
import { formatDate } from "../../../../helper";

const UPDATE_REQUEST = gql`
  mutation($id: Int!, $status: Int!) {
    updateSessionRequestStatus(id: $id, status: $status) {
      id
      status {
        label
        code
      }
      message
    }
  }
`;

const JoinRequests = ({ sessionRequests, refetch }) => {
  const [updateRequestStatus, { loading }] = useMutation(UPDATE_REQUEST);

  const denyRequest = async id => {
    await updateRequestStatus({
      variables: {
        id: parseInt(id),
        status: SESSION_REQUEST_STATUS.NOT_ACCEPTED
      }
    }).then(() => refetch());
  };

  const acceptRequest = async id => {
    await updateRequestStatus({
      variables: {
        id: parseInt(id),
        status: SESSION_REQUEST_STATUS.ACCEPTED
      }
    }).then(() => refetch());
  };

  return (
    <div>
      <Header>
        <u>Requests</u>
      </Header>
      {sessionRequests.length === 0 && (
        <Empty description="No join request found" />
      )}
      {sessionRequests.map(request => {
        const { username, islandName } = request.user;
        return (
          <RequestContainer key={`session-join-request-${request.id}`}>
            <ul>
              <li>
                <Icon marginRight={0.95} icon={faUser} />
                <p>{username}</p>
              </li>
              {islandName && (
                <li>
                  <Icon marginRight={0.58} icon={faPlaneDeparture} />
                  <p>Arriving from {islandName}</p>
                </li>
              )}
              {request.message && (
                <li>
                  <Icon marginRight={0.8} icon={faComment} />
                  <p>{request.message}</p>
                </li>
              )}
              <li>
                <Icon marginRight={0.97} icon={faCalendar} />
                <p>
                  Created at: {' '}
                  {formatDate(request.createdAt, {
                    format: "h:mma"
                  })}
                </p>
              </li>
            </ul>
            <Actions>
              <Tooltip title="Accept & Send DODO Code">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<Icon icon={faSignInAlt} />}
                  loading={loading}
                  onClick={() => acceptRequest(request.id)}
                />
              </Tooltip>
              <SizedBox width={5} />
              <Tooltip title="Deny">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<Icon icon={faWindowClose} />}
                  loading={loading}
                  onClick={() => denyRequest(request.id)}
                />
              </Tooltip>
            </Actions>
          </RequestContainer>
        );
      })}
    </div>
  );
};

JoinRequests.propTypes = {
  refetch: PropTypes.func,
  sessionRequests: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      status: PropTypes.object.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        islandName: PropTypes.string
      })
    })
  )
};

export default JoinRequests;
