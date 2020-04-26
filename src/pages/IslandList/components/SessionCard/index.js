import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Tooltip } from "antd";

import { CardContainer, CloseIcon } from "./styles";
import { getUser } from "../../../../helpers/local-storage";

const DELETE_SESSION = gql`
  mutation($id: Int!) {
    deleteSession(id: $id)
  }
`;

const SessionCard = ({ id, note, dodoCode, refetch, owner }) => {
  const currentUser = getUser();
  const [deleteSession] = useMutation(DELETE_SESSION);

  const isOwner = `${owner.id}` === `${currentUser.id}`;

  /**
   * User can delete their current session if it is listed.
   */
  const handleSessionDelete = () => {
    if (!isOwner) return;
    deleteSession({
      variables: {
        id: parseInt(id)
      }
    })
      .then(() => {
        refetch();
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <CardContainer>
      {isOwner && (
        <Tooltip placement="right" title={"Remove your session"}>
          <CloseIcon
            twoToneColor={"red"}
            title={"Remove your session"}
            onClick={handleSessionDelete}
          />
        </Tooltip>
      )}
      <div>{owner.username}</div>
      <div>
        <b>DODO CODE:</b> {dodoCode}
      </div>

      {note && (
        <div>
          <b>Note:</b> {note}
        </div>
      )}
    </CardContainer>
  );
};

export default SessionCard;
