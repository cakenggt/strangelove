import 'babel-polyfill';
import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import crypto from 'crypto';
import store from './store';
import ConnectView from './components/ConnectView.jsx';
import VaultView from './components/VaultView.jsx';

var Index = connect(function(state){
  return {
    login: state.connect.login
  }
})(React.createClass({
  render: function() {
    var component = this.props.login == 'SUCCESS' ?
    <VaultView/> :
    <ConnectView/>;
    return component;
  }
}));

var router = (
  <Router history={browserHistory}>
    <Route path="/" >
      <IndexRoute component={Index}/>
    </Route>
  </Router>
);

render(
  <Provider store={store}>{router}</Provider>,
  document.getElementById('app')
);
