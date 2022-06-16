import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { SnackbarProvider } from "notistack";

import { store } from "./store";
import App from "./App";


const client = new ApolloClient({
  uri:process.env.REACT_APP_GRAPHQL_URL,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </Provider>
  </ApolloProvider>
);
