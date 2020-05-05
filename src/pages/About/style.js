import styled from "styled-components";

const PageWrapper = styled.div`
  background: #c5d2f5;
  border-radius: 35px;
  padding: 1rem;
  background-image: radial-gradient(#78a3e4 2px, transparent 2px),
    radial-gradient(#78a3e4 2px, transparent 2px);
  background-size: calc(20 * 2px) calc(20 * 2px);
  background-position: 0 0, calc(10 * 2px) calc(10 * 2px);
`;

const Disclaimer = styled.span`
  color: ${({ theme }) => theme.colors.gray.dark};
`;

export { PageWrapper, Disclaimer };
