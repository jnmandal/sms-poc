import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// state management
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import Messages from './redux/Messages';
import { Provider } from 'react-redux';

const enhancers = [
  applyMiddleware(thunk)
];

if (window.devToolsExtension) {
  enhancers.push(
    window.devToolsExtension());
}

const store = createStore(
  combineReducers({messages: Messages}),
  compose(...enhancers));

// routing
import { Router, Route, hashHistory } from 'react-router';

// subcomponents
import Conversation from './Conversation';
import NewMessage from './NewMessage';

ReactDOM.render(
  (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App} name="main">
          <Route
            path="/new"
            component={NewMessage}
            name="new" />
          <Route
            path="/:number"
            component={Conversation}
            name="conversation" />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root'));
