import 'babel-polyfill';
import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import crypto from 'crypto';
import store from './store';

var Index = connect()(React.createClass({
  render: function() {
    return (
      <div></div>
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
