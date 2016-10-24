import 'babel-polyfill';
import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import store from './store';
import ConnectView from './components/ConnectView.jsx';
import VaultView from './components/VaultView.jsx';

var Index = connect(function(state){
  return {
    login: state.connect.login,
    errors: state.errors
  }
})(React.createClass({
  render: function() {
    var component = this.props.login == 'SUCCESS' ?
    <VaultView/> :
    <ConnectView/>;
    var errors = this.props.errors.map(function(elem, i){
      return (
        <span
          className="error"
          key={i}>
          {elem}
        </span>
      )
    });
    return (
      <div>
        {errors}<br/>
        {component}
      </div>
    );
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
