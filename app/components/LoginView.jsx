import React from 'react';
import {connect} from 'react-redux';
import {login} from '../actions';

var LoginView = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Login</h2>
        <input
          id="email"
          placeholder="email"/><br/>
        <input
          id="password"
          placeholder="password"/><br/>
        <span
          onClick={this.login}>Login</span>
        <span
          onClick={()=>{this.props.switchRegister(true)}}>Register</span>
      </div>
    );
  },
  login: function(){
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    this.props.login(email, password);
  }
});

var mapStateToProps = (state) => {
  return {

  }
}

var mapDispatchToProps = (dispatch) => {
  return {
    login: function(email, password){
      dispatch(login(email, password));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginView);
