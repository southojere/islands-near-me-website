import { createGlobalStyle } from "styled-components";

/**
 * Most of those styles are to overwrite ant.design global styles
 */
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
  }

  body {
    margin: 0;
    font-weight: 500;

    h1, h2, h3, h4, h5, h6 {
      font-weight: 600;
    }
  }

  td {
    font-size: 16px;
  }

  a, p, span, label, h1, h2, h3, h4, h5, h6, button, input {
    font-family: ${({ theme }) => theme.fonts.Roboto};
  }
  
  p {
      margin:0;
  }

  ul, li {
    list-style: none;
    padding: 0;
  }

  button {
    background: transparent;
    border-radius: 4px;
    cursor: pointer;
  }

  input, button {
    border: none;
    outline: transparent;
  }
  
  .secondary-color {
      background:#F8F3E7
  }

  .ant-select-selector {
    background:#F8F3E7 !important;
    border:none;
}

  .ant-select-dropdown {
      /* border-radius:15px !important; */
  }

  .ant-select-selector{
      /* border-radius:15px !important; */

  }

  .ant-select-item-option-active {
    background: repeating-linear-gradient(
        -45deg,
        #f6d476,
        #f6d476 10px,
        #fbc16e 10px,
        #fbc16e 20px
      ) !important;
  }

  .ant-select-item {

    &:hover {
      background: repeating-linear-gradient(
        -45deg,
        #f6d476,
        #f6d476 10px,
        #fbc16e 10px,
        #fbc16e 20px
      ) !important;
    }
  }
  .ant-drawer-content-wrapper {
      width:300px !important;
  }

`;

export default GlobalStyle;
