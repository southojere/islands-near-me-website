import React from "react";
import { Button, Alert } from "antd";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import TextArea from "antd/lib/input/TextArea";

import Modal from "../../../../components/Modal";

const REQUEST_TO_JOIN_SESSION = gql`
  mutation($id: Int!, $message: String) {
    requestToJoin(id: $id, message: $message)
  }
`;

const RequestToJoinModal = ({ sessionId, onCancel, onComplete, opened }) => {
  const [requestToJoin, { loading }] = useMutation(REQUEST_TO_JOIN_SESSION);
  const [message, setMessage] = React.useState("");
  const [gqlError, setError] = React.useState(``);

  const handleSubmit = () => {
    requestToJoin({
      variables: {
        id: sessionId,
        message: message ? message : null
      }
    })
      .then(() => onComplete())
      .catch(e => setError(e.toString()));
  };

  const RenderModelBody = () => {
    return (
      <>
        {gqlError && (
          <Alert
            message={gqlError}
            type={"error"}
            showIcon
            onClose={() => setError("")}
          />
        )}
        <br />
        <TextArea
          rows={3}
          placeholder="note"
          value={message}
          onChange={({ target: { value } }) => {
            setMessage(value);
          }}
        />
      </>
    );
  };

  return (
    <Modal
      title={"Ask for dodo code"}
      component={() => RenderModelBody()}
      actions={[
        <Button
          type="primary"
          block
          onClick={() => {
            handleSubmit();
          }}
          loading={loading}
        >
          Create
        </Button>
      ]}
      onCancel={onCancel}
      opened={opened}
      onSubmit={handleSubmit}
    />
  );
};

export default RequestToJoinModal;
