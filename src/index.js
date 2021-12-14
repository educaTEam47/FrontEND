import React from 'react';
import './index.css';
import App from './App';
import { render } from "react-dom";
import reportWebVitals from './reportWebVitals';
import {ApolloClient, createHttpLink, InMemoryCache, ApolloProvider} from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter} from "react-router-dom"
import Login from './login/login'
import Header from './header';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  cache:new InMemoryCache(),
  link: authLink.concat(httpLink)
});


const rootElement = document.getElementById("root");
render(
  <ApolloProvider client={client}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </ApolloProvider>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
