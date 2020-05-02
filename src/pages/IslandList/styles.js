import styled from "styled-components";
import { Pagination, Select, Empty } from "antd";

const PageWrapper = styled.div`
  position: relative;
  background: #f79d7b;
  min-height: 300px;
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
  margin-left: 0.5rem;
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
  margin-bottom: 1rem;
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

const LoaderWrapper = styled.div`
  position: absolute;
  right: 2rem;
  bottom: 2rem;
`;

const EmptyComponent = styled(Empty)`
    
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
  LoaderWrapper,
  EmptyComponent
};
