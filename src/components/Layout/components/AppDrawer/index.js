import React from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import { Drawer } from "antd";
import { SessionWrapper } from "./style";
import { SESSION_REQUEST_STATUS } from "../../../../constants";

const AppDrawer = ({ showDrawer, visible, onClose, requests, children }) => {
  return (
    <>
      <span onClick={showDrawer}>{children}</span>
      <Drawer
        title="Session Requests"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        {requests.map(request => {
          const sessionHost = get(request.session, "host");
          return (
            <SessionWrapper key={`session-request-status-${request.id}`}>
              {sessionHost.islandName && (
                <p>
                  <b>ISLAND NAME</b>: {sessionHost.islandName}
                </p>
              )}
              <p>
                <b>HOST</b>: {sessionHost.username}
              </p>
              <p>
                <b>DODO CODE</b>:{" "}
                {request.status.code === SESSION_REQUEST_STATUS.ACCEPTED
                  ? request.session.dodoCode
                  : request.status.label}
              </p>
              <p>
                <b>STATUS</b>: {request.status.label}
              </p>
            </SessionWrapper>
          );
        })}
      </Drawer>
    </>
  );
};

AppDrawer.propTypes = {
  showDrawer: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  requests: PropTypes.array.isRequired
};
export { AppDrawer };
