import React from 'react';
import {connect} from 'react-redux';
import {register} from '../actions';

var RegisterView = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Register</h2>
        <input
          id="email"
          placeholder="email"/><br/>
        <input
          id="password"
          type="password"
          placeholder="password"/><br/>
        <input
          id="confirmPassword"
          type="password"
          placeholder="confirm password"/><br/>
        <span
          onClick={()=>{this.props.switchRegister(false)}}>Login</span>
        <span
          onClick={this.register}>Register</span>
      </div>
    );
  },
  register: function(){
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    this.props.register(email, password, confirmPassword);
  }
});

var mapDispatchToProps = (dispatch) => {
  return {
    register: function(email, password, confirmPassword){
      dispatch(register(email, password, confirmPassword));
    }
  }
};

export default connect(
  null,
  mapDispatchToProps
)(RegisterView);
