import styled from "styled-components";

const PageWrapper = styled.div`
  background: white;
  border-radius: 35px;
  padding: 1rem;
`;

const MenuTitle = styled.h2`
  text-align: center;
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 90px;
  background: ${props => props.backgroundColor && props.backgroundColor};
  filter: ${props => props.disabled && "grayscale(100%)"};
  border-radius: 25px;
  transition: all 0.5s;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  animation: 0.5s ease-in wiggleAnimation;

  &:hover {
    transform: scale(1.1);
  }

  img {
    display: block;
    width: 90%;
    height: 90%;
  }

  @keyframes wiggleAnimation {
    0% {
      transform: rotate(-10deg);
    }
    50% {
      transform: rotate(10deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  justify-items: center;
  grid-template-rows: auto;
  grid-gap: 1rem;
`;

export { PageWrapper, MenuTitle, MenuGrid, MenuItem };
