import styled from "styled-components";
const Section = styled.div`
  background: white;
  border-radius: 35px;
  padding: 1rem;
  -webkit-transition: all 0.25s ease;
  -o-transition: all 0.25s ease;
  transition: all 0.25s ease;
  color:black;
`;

const Header = styled.div`
  display: flex;
  text-decoration: underline;
`;

const Body = styled.div`
  margin-top: ${props => (props.show ? "1rem" : "0")};
  max-height: ${props => (props.show ? "500px" : "0")};
  text-decoration: none;
  overflow: hidden;
  -webkit-transition: all 0.25s ease;
  -o-transition: all 0.25s ease;
  transition: all 0.25s ease;
  
`;

export { Section, Header, Body };
