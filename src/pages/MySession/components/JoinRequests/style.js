import styled from "styled-components";

const RequestContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  background: #262626;
  padding: 1rem;
  border-radius: 3px;
  border-bottom: 3px solid #3e3e3e;
  border-left: 2px solid #212121;
  border-right: 2px solid #212121;
  border-top: 2px solid #212121;
  ul li {
    display: flex;
    align-items: center;
    padding:0;
  }
  ul {
    margin: 0;
  }
  p {
      margin:0;
  }
`;

const Header = styled.h2`
  color: white;
  display:flex;
`;

const Actions = styled.div`
  /* position: absolute; */
  display: flex;
  flex-direction: row;
  /* top: 30%;
  right: 16px;
  height: 100%; */
`;

const SizedBox = styled.div`
  width: ${props => `${props.width}px`};
  height: ${props => `${props.height}px`};
`;

export { Header, RequestContainer, Actions, SizedBox };
