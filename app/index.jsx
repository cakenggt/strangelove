import 'babel-polyfill';
import React from 'react';
import {Router, Route, IndexRedirect, browserHistory, Link, IndexLink} from 'react-router';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import store from './store';
import RegisterView from './components/RegisterView.jsx';
import LoginView from './components/LoginView.jsx';
import TOTPView from './components/TOTPView.jsx';
import VaultView from './components/VaultView.jsx';
import VaultItemView from './components/VaultItemView.jsx';
import LogoutView from './components/LogoutView.jsx';
import SettingsView from './components/SettingsView.jsx';
import MessageComponent from './components/MessageComponent.jsx';
import PasswordResetView from './components/PasswordResetView.jsx';
import RequestResetView from './components/RequestResetView.jsx';

var Index = connect(function(state){
  return {
    login: state.connect.login,
    messages: state.messages
  }
})(React.createClass({
  render: function() {
    var errors = this.props.messages.map(function(elem, i){
      return (
        <MessageComponent
          message={elem}
          index={i}
          key={i}/>
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
      <IndexRedirect to="/vault" />
      <Route path="vault" component={VaultView} onEnter={loginCheck}>
        <Route path="item/:itemId" component={VaultItemView}/>
      </Route>
      <Route path="login" component={LoginView}>
        <Route path="totp" component={TOTPView}/>
      </Route>
      <Route path="register" component={RegisterView}/>
      <Route path="logout" component={LogoutView} onEnter={loginCheck}/>
      <Route path="settings" component={SettingsView} onEnter={loginCheck}/>
      <Route path="reset" component={RequestResetView}/>
      <Route path="reset/:code" component={PasswordResetView}/>
    </Route>
  </Router>
);

render(
  <Provider store={store}>{router}</Provider>,
  document.getElementById('app')
);
