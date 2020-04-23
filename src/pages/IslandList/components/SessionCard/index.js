import React from "react";
import { Tooltip } from "antd";

import { CardContainer, CloseIcon } from "./styles";
// import { deleteSession } from "../../../../graphql/mutations";

const SessionCard = ({
  id,
  note,
  host,
  dodoCode,
  currentUser,
  refetch
}) => {
  const { username } = host;
  const { email } = currentUser;

  const isOwner = email === host.email;

  /**
   * User can delete their current session if it is listed.
   */
  const handleSessionDelete = async () => {
    if (!isOwner) return;
    // await API.graphql(
    //   graphqlOperation(deleteSession, {
    //     input: {
    //       id
    //     }
    //   })
    // );
    // refetch();
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
      <div>{username}</div>
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
