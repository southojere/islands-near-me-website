import React from "react";
import { LoaderWrapper } from "./style";

function Loader() {
  return (
    <LoaderWrapper>
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
}

export default Loader;
