import React from "react";
import PropTypes from "prop-types";

import { Header } from "../JoinRequests/style";
import {
  SessionContainer,
  VisitorContainer,
  FlexWrapper
} from "./style";

//images
import celesteIcon from "../../../../images/celesteIcon.png";
import kicksIcon from "../../../../images/kicksIcon.png";
import liefIcon from "../../../../images/liefIcon.png";
import saharahIcon from "../../../../images/saharahIcon.png";
import reddIcon from "../../../../images/reddIcon.png";
import Actions from "./components/Actions";

const SessionDetails = ({ session,refetch }) => {
  const {
    dodoCode,
    note,
    hasCeleste,
    hasSaharah,
    hasKicks,
    hasLeif,
    hasRedd,
    isFull,
  } = session;
  return (
    <div>
      <FlexWrapper>
        <Header>
          <u>Current Session</u>
        </Header>
        <Actions session={session} refetch={refetch}/>
      </FlexWrapper>
      <SessionContainer>
        <p>
          <b>DODO CODE</b>: {dodoCode} {isFull && `(Hidden because session is marked as full)`}
        </p>
        <p>
          <b>NOTE</b>: {note}
        </p>
        <VisitorContainer>
          <p>
            <b>VISITORS</b>:
          </p>
          {hasCeleste && (
            <img src={celesteIcon} alt="Celeste Icon" title="Celeste"></img>
          )}
          {hasSaharah && (
            <img src={saharahIcon} alt="Saharah Icon" title="Saharah"></img>
          )}
          {hasKicks && (
            <img src={kicksIcon} alt="Kicks Icon" title="Kicks"></img>
          )}
          {hasLeif && <img src={liefIcon} alt="lief icon" title="Lief"></img>}
          {hasRedd && <img src={reddIcon} alt="Redd icon" title={"Redd"}></img>}
        </VisitorContainer>
      </SessionContainer>
    </div>
  );
};

SessionDetails.propTypes = {
  session: PropTypes.shape({
    id: PropTypes.string,
    dodoCode: PropTypes.string,
    isFull: PropTypes.bool,
    note: PropTypes.string,
    hasCeleste: PropTypes.bool,
    hasSaharah: PropTypes.bool,
    hasKicks: PropTypes.bool,
    hasLeif: PropTypes.bool,
    hasRedd: PropTypes.bool,
    isPrivate: PropTypes.bool,
    createdAt: PropTypes.string
  }),
  refetch: PropTypes.func.isRequired,
};

export default SessionDetails;
