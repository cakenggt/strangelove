import 'babel-polyfill';
import React from 'react';
import {Router, Route, IndexRoute, browserHistory, Link, IndexLink} from 'react-router';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import store from './store';
import RegisterView from './components/RegisterView.jsx';
import LoginView from './components/LoginView.jsx';
import VaultView from './components/VaultView.jsx';
import LogoutView from './components/LogoutView.jsx';
import SettingsView from './components/SettingsView.jsx';

var Index = connect(function(state){
  return {
    login: state.connect.login,
    errors: state.errors
  }
})(React.createClass({
  render: function() {
    var errors = this.props.errors.map(function(elem, i){
      return (
        <span
          className="error"
          key={i}>
          {elem}
        </span>
      )
    });
    var defaultLinks = [

    ];
    var loggedInLinks = [
      {
        display: 'Vault',
        value: '/'
      },
      {
        display: 'Logout',
        value: '/logout'
      },
      {
        display: 'Settings',
        value: '/settings'
      }
    ];
    var loggedOutLinks = [
      {
        display: 'Login',
        value: '/login'
      },
      {
        display: 'Register',
        value: '/register'
      }
    ];
    var links = defaultLinks.map(function(elem, i){
      return <Link
        to={elem.value}
        key={i}
        className="link"
        activeClassName="active">{elem.display}</Link>;
    });
    var arr = this.props.login ? loggedInLinks : loggedOutLinks;
    var additionalLinks = arr.map(function(elem, i){
      if (elem.value == '/'){
        return <IndexLink
          to={elem.value}
          key={links.length+i}
          className="link"
          activeClassName="active">{elem.display}</IndexLink>;
      }
      else{
        return <Link
          to={elem.value}
          key={links.length+i}
          className="link"
          activeClassName="active">{elem.display}</Link>;
      }
    });
    links = [...additionalLinks, ...links];
    return (
      <div
        className="content">
        <h1>Frost</h1>
        <div
          className="nav">
          {links}
        </div>
        <div
          className="errors">
          {errors}
        </div>
        {this.props.children}
      </div>
    );
  }
}));

const loginCheck = function(nextState, replace){
  if (!store.getState().connect.login){
    replace('/login');
  }
}

var router = (
  <Router history={browserHistory}>
    <Route path="/" component={Index}>
      <IndexRoute component={VaultView} onEnter={loginCheck}/>
      <Route path="/login" component={LoginView}/>
      <Route path="/register" component={RegisterView}/>
      <Route path="/logout" component={LogoutView} onEnter={loginCheck}/>
      <Route path="/settings" component={SettingsView} onEnter={loginCheck}/>
    </Route>
  </Router>
);

render(
  <Provider store={store}>{router}</Provider>,
  document.getElementById('app')
);
