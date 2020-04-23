import { createGlobalStyle } from 'styled-components';


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
    font-family: ${({ theme }) => theme.fonts.PingFangSC};
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

`;

export default GlobalStyle;
