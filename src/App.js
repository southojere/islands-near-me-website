import React from "react";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "styled-components";

import "./App.css";
import GlobalStyle from "./styles/global-styles";
import theme from "./styles/theme";
import Routes from "./routes";
import config from "./config";
import { getAccessToken } from "./helpers/local-storage";
import './styles/pattern.min.css'
require("dotenv").config();

const client = new ApolloClient({
  uri: config.api,
  cache: new InMemoryCache(),
  request: operation => {
    const token = getAccessToken();
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
