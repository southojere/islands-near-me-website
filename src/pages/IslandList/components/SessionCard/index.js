import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Tooltip } from "antd";
import { get } from "lodash";

import { CardContainer, CloseIcon, VisitorContainer, Badge } from "./styles";
import { getUser } from "../../../../helpers/local-storage";
import { formatDate } from "../../../../helper";

//images
import celesteIcon from "../../../../images/celesteIcon.png";
import kicksIcon from "../../../../images/kicksIcon.png";
import liefIcon from "../../../../images/liefIcon.png";
import saharahIcon from "../../../../images/saharahIcon.png";
import flickIcon from "../../../../images/flickIcon.png";
import cjIcon from "../../../../images/cjIcon.png";
import reddIcon from "../../../../images/reddIcon.png";

const DELETE_SESSION = gql`
  mutation($id: Int!) {
    deleteSession(id: $id)
  }
`;

const SessionCard = ({
  id,
  note,
  dodoCode,
  refetch,
  owner,
  createdAt,
  isFull,
  ...visitors
}) => {
  const {
    hasCeleste,
    hasSaharah,
    hasKicks,
    hasCJ,
    hasRedd,
    hasFlick,
    hasLeif
  } = visitors;
  const currentUser = getUser();
  const [deleteSession] = useMutation(DELETE_SESSION);

  const isOwner = `${owner.id}` === `${get(currentUser, "id", null)}`;

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
        <b>DODO CODE:</b> {!isFull ? dodoCode : <Badge>FULL</Badge>}
      </div>

      {note && (
        <div>
          <b>Note:</b> {note}
        </div>
      )}
      <span>
        <b>Created:{" "}</b>
        {formatDate(createdAt, {
          format: "h:mma"
        })}
      </span>
      <VisitorContainer>
        {hasCeleste && (
          <img src={celesteIcon} alt="Celeste Icon" title="Celeste"></img>
        )}
        {hasSaharah && (
          <img src={saharahIcon} alt="Saharah Icon" title="Saharah"></img>
        )}
        {hasKicks && <img src={kicksIcon} alt="Kicks Icon" title="Kicks"></img>}
        {console.log(hasLeif)}
        {hasLeif && <img src={liefIcon} alt="lief icon" title="Lief"></img>}
        {hasFlick && <img src={flickIcon} alt="cj icon" title="Flick"></img>}
        {hasCJ && <img src={cjIcon} alt="cj icon" title={"CJ"}></img>}
        {hasRedd && <img src={reddIcon} alt="Redd icon" title={"CJ"}></img>}
      </VisitorContainer>
    </CardContainer>
  );
};

export default SessionCard;
