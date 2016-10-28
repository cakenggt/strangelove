import React from 'react';
import {withRouter, Link} from 'react-router';
import {connect} from 'react-redux';
import {login} from '../actions';
import FocusComponent from './FocusComponent.jsx';

var LoginView = withRouter(React.createClass({
  getInitialState: function(){
    return {
      email: '',
      password: ''
    };
  },
  render: function() {
    var className = this.props.children ?
      'focus blur' :
      'focus';
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
    return (
      <div
        className={"modal-container center"}>
        <div
          className={"bordered "+className}>
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
            type="password"/>
          <div
            className="button"
            onClick={this.login}>Login</div>
          <Link
            to="/reset"
            className="button">Forgot Your Password?</Link>
        </div>
        <FocusComponent>
          {React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
              email: this.state.email,
              password: this.state.password
            });
          })}
        </FocusComponent>
      </div>
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
