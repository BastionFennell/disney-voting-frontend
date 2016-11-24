import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import {setState} from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import {Router, Route, hashHistory} from 'react-router';
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';
import './index.css';

const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state =>
  store.dispatch(setState(state))
);

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);


const routes = (
  <Route component={App}>
    <Route path="/results" component={ResultsContainer} />
    <Route path="/" component={VotingContainer} />
  </Route>
)


ReactDOM.render(
  (<Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>),
  document.getElementById('app')
);
