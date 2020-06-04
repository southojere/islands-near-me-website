import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Tooltip } from "antd";
import { get } from "lodash";

import {
  CardContainer,
  CloseIcon,
  VisitorContainer,
  Badge,
  RequestButton
} from "./styles";
import { getUser } from "../../../../helpers/local-storage";
import { formatDate } from "../../../../helper";

//images
import celesteIcon from "../../../../images/celesteIcon.png";
import kicksIcon from "../../../../images/kicksIcon.png";
import liefIcon from "../../../../images/liefIcon.png";
import saharahIcon from "../../../../images/saharahIcon.png";
import reddIcon from "../../../../images/reddIcon.png";
import RequestToJoinModal from "../RequestToJoinModal";

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
  isPrivate,
  ...visitors
}) => {
  const { hasCeleste, hasSaharah, hasKicks, hasRedd, hasLeif } = visitors;
  const currentUser = getUser();
  const [deleteSession] = useMutation(DELETE_SESSION);
  const [opened, setOpenState] = React.useState(false);

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

  const RenderDodoCode = () => {
    if (currentUser && currentUser.id === owner.id)
      return <span>{dodoCode}</span>;
    if (isFull) return <Badge>FULL</Badge>;
    if (isPrivate)
      return (
        <>
          <Tooltip placement="right" title="Request Dodo Code">
            <RequestButton
              type="primary"
              size="small"
              shape="round"
              onClick={() => setOpenState(true)}
            >
              Request
            </RequestButton>
          </Tooltip>
        </>
      );
    return <span>{dodoCode}</span>;
  };

  return (
    <CardContainer data-testid="session-card-container">
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
        <b>DODO CODE:</b>
        <RenderDodoCode />
      </div>

      {note && (
        <div>
          <b>Note:</b> {note}
        </div>
      )}
      <span>
        <b>Created: </b>
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
        {hasRedd && <img src={reddIcon} alt="Redd icon" title={"Redd"}></img>}
      </VisitorContainer>
      <RequestToJoinModal
        opened={opened}
        sessionId={parseInt(id)}
        onCancel={() => setOpenState(false)}
        onComplete={() => {
          setOpenState(false);
          window.location.reload();
        }}
      />
    </CardContainer>
  );
};

export { SessionCard, DELETE_SESSION };
