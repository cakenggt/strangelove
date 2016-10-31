import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {register} from '../actions';

var RegisterView = withRouter(React.createClass({
  getInitialState: function(){
    return {
      email: '',
      password: '',
      confirmPassword: ''
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
    return (
      <div
        className="center">
        <div
          className="bordered">
          <input
            placeholder="email"
            onChange={controlledComponentChangeGenerator('email')}
            onKeyDown={controlledComponentKeyDownGenerator('email')}
            value={this.state.email}/><br/>
          <input
            type="password"
            placeholder="password"
            onChange={controlledComponentChangeGenerator('password')}
            onKeyDown={controlledComponentKeyDownGenerator('password')}
            value={this.state.password}/><br/>
          <input
            type="password"
            placeholder="confirm password"
            onChange={controlledComponentChangeGenerator('confirmPassword')}
            onKeyDown={controlledComponentKeyDownGenerator('confirmPassword')}
            value={this.state.confirmPassword}/><br/>
          <span
            className="button"
            onClick={this.register}>Register</span>
        </div>
      </div>
    );
  },
  register: function(){
    var email = this.state.email;
    var password = this.state.password;
    var confirmPassword = this.state.confirmPassword;
    this.props.register(email, password, confirmPassword, this.props.router);
  }
}));

var mapDispatchToProps = (dispatch) => {
  return {
    register: function(email, password, confirmPassword, router){
      dispatch(register(email, password, confirmPassword, router));
    }
  }
};

export default connect(
  null,
  mapDispatchToProps
)(RegisterView);
