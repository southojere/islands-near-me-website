import React from "react";
import PropTypes from "prop-types";
import { Section, Header, Body } from "./style";

function Collapse({ title, body }) {
  const [showContent, setShowContent] = React.useState(false);
  return (
    <Section>
      <Header onClick={() => setShowContent(!showContent)}>{title}</Header>
      <Body show={showContent}>{body}</Body>
    </Section>
  );
}

Collapse.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.func.isRequired
};

export default Collapse;
