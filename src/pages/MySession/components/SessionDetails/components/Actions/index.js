import React from "react";
import { gql } from "apollo-boost";
import { Button, Popconfirm, message } from "antd";
import { useMutation } from "react-apollo";

import { SessionActions } from "../../style";

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

const Actions = ({ session,refetch }) => {
  const [toggleSessionFull, { loading: markFullLoading }] = useMutation(
    MARK_SESSION_FULL
  );
  const [deleteSession, { loading: deleteLoading }] = useMutation(
    DELETE_SESSION
  );

  const handleDeleteSession = async () => {
    await deleteSession({
      variables: {
        id: parseInt(session.id)
      }
    }).then(() => {
        refetch();
        message.success('Session deleted! Reloading the page...');
    });
  };

  const markSessionAsFull = async () => {
    await toggleSessionFull({
      variables: {
        id: parseInt(session.id)
      }
    }).then(() => {
        refetch();
        message.success('Done!');
    });
  };

//   const handleGetSessionLink = () => {};

  return (
    <SessionActions>
      <Popconfirm
        title="Are you sure you want to delete this session?"
        onConfirm={handleDeleteSession}
        onCancel={() => {}}
        okText="Yes"
        cancelText="No"
      >
        <Button type="primary" size="small" loading={deleteLoading}>
          Delete
        </Button>
      </Popconfirm>
      <Button
        type="primary"
        size="small"
        loading={markFullLoading}
        onClick={markSessionAsFull}
      >
        {session.isFull ? `Show dodo code`: `Mark as full`}
      </Button>
      <Button type="primary" size="small" disabled>
        Share session
      </Button>
    </SessionActions>
  );
};

Actions.propTypes = {};

export default Actions;
