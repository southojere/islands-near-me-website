import styled from "styled-components";
import { Pagination, Select } from "antd";

const PageWrapper = styled.div`
  position: relative;
  background: #f79d7b;
  border-radius: 35px;
  padding: 2rem;
`;

const ListWrapper = styled.div`
  border-radius: 35px;
`;

const IconWrapper = styled.div`
  background: ${({ theme }) => theme.colors.secondary.default};
  border-radius: 50px;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0.5rem;
  &:hover {
    background: repeating-linear-gradient(
      -45deg,
      #f6d476,
      #f6d476 10px,
      #fbc16e 10px,
      #fbc16e 20px
    );
  }
`;

const CustomPagination = styled(Pagination)`
  text-align: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const CustomSelect = styled(Select)`
  .ant-select-selector {
    border: none;
    outline: none;
    &:hover {
      background: repeating-linear-gradient(
        -45deg,
        #f6d476,
        #f6d476 10px,
        #fbc16e 10px,
        #fbc16e 20px
      );
    }
  }
  margin-right: 1rem;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  > div {
    margin-right: 1rem;
  }
`;

const Text = styled.p`
  text-align: ${props => props.center};
  width:100%;
`;
export {
  Header,
  PageWrapper,
  ListWrapper,
  IconWrapper,
  CustomPagination,
  ActionContainer,
  CustomSelect,
  FilterContainer,
  Text
};
