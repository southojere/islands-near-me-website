import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PageWrapper = styled.div`
  background: #323232;
  border-radius: 35px;
  padding: 1rem;
  color: white;
`;

const PageHeader = styled.h2`
  text-align: center;
  color: white;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: ${props => (props.marginRight ? `${props.marginRight}rem` : 0)};
`;

const AlignLeftContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Text = styled.p`
  text-align: ${props => props.align && props.align};
  margin: ${props => props.margin && props.margin.join("px ")};
`;

export { PageWrapper, PageHeader, Icon, AlignLeftContainer, Text };
