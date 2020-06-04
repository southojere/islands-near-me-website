import React from "react";
import PropTypes from "prop-types";
import { LoaderWrapper } from "./style";

const Loader = ({ color }) => {
  return (
    <LoaderWrapper color={color}>
      <div className="la-ball-spin-clockwise">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </LoaderWrapper>
  );
};

Loader.defaultProps = {
  color: "#fff"
};

Loader.propTypes = {
  color: PropTypes.string
};

export default Loader;
