import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Cookies from "js-cookie";
import { ThemeProvider } from "styled-components";

import "./App.css";
import GlobalStyle from "./styles/global-styles";
import theme from "./styles/theme";
import Routes from "./routes";
import config from './config'
require('dotenv').config()

const client = new ApolloClient({
  uri: config.api,
  request: operation => {
    const token = Cookies.get("access-token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ""
      }
    });
  }
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
