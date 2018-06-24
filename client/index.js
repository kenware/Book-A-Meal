import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './routes';
import configureStore from './redux/store';

const store = configureStore();

render(
  <Provider store={store}>
    <Routes /* history={browserHistory}  routes={routes} */ />
  </Provider>
  , document.getElementById('root')
);
