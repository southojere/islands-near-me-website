import styled from "styled-components";

const SessionContainer = styled.div`
  color: white;
`;

const VisitorContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const SessionActions = styled.div`
  display: flex;
  > button {
    margin-right: 1rem;
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: ${prop => (prop.direction ? prop.direction : "row")};
  align-items: center;
  justify-content: space-between;
`;

export { SessionContainer, VisitorContainer, SessionActions, FlexWrapper };
