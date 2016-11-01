import React from 'react';
import {withRouter, Link} from 'react-router';
import {connect} from 'react-redux';
import {login} from '../actions';
import ModalContainer from './ModalContainer.jsx';

var LoginView = withRouter(React.createClass({
  getInitialState: function(){
    return {
      email: '',
      password: ''
    };
  },
  render: function() {
    var controlledComponentChangeGenerator = (stateAttr) => {
      return (event) => {
        let newState = {};
        newState[stateAttr] = event.target.value;
        this.setState(newState);
      };
    };
    var controlledComponentKeyDownGenerator = (stateAttr) => {
      return (event) => {
        if (event.key == 'Enter'){
          event.preventDefault();
          this.login();
        }
      };
    };
    var child = this.props.children ?
      <div
        key={this.props.location.pathname}>
        {this.props.children}
      </div>:
      null;
    return (
      <ModalContainer
        modal={child}>
        <div
          className="center">
          <div
            className="bordered">
            <input
              placeholder="email"
              onChange={controlledComponentChangeGenerator('email')}
              onKeyDown={controlledComponentKeyDownGenerator('email')}
              value={this.state.email}
              autoFocus/><br/>
            <input
              placeholder="password"
              onChange={controlledComponentChangeGenerator('password')}
              onKeyDown={controlledComponentKeyDownGenerator('password')}
              value={this.state.password}
              type="password"/><br/>
            <span
              className="button"
              onClick={this.login}>Login</span><br/>
            <Link
              to="/reset"
              className="button">Forgot Your Password?</Link>
          </div>
        </div>
      </ModalContainer>
    );
  },
  login: function(){
    var email = this.state.email;
    var password = this.state.password;
    this.props.login(email, password, this.props.router);
  }
}));

var mapStateToProps = (state) => {
  return {

  }
}

var mapDispatchToProps = (dispatch) => {
  return {
    login: function(email, password, router){
      dispatch(login(email, password, router));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginView);
