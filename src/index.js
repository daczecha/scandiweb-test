import React from 'react';
import { createRoot } from 'react-dom/client';

import { ApolloProvider } from '@apollo/client';

import client from './GraphQL/client';

import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import categoryReducer from './reducers/categoryReducer';

import App from './App';

import './index.css';
import currencyReducer from './reducers/currencyReducer';

const rootReducer = combineReducers({
  category: categoryReducer,
  currency: currencyReducer,
});

const store = createStore(rootReducer);

const root = createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
);
