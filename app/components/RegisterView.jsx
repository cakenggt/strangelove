import React from 'react';
import {connect} from 'react-redux';

var RegisterView = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Register</h2>
        <span
          id="error"></span>
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
    fetch('/api/v1/register', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(function(response){
      return response.json();
    })
    .then((response)=>{
      if (response.errors.length){
        document.getElementById('error').innerHTML = JSON.stringify(response.errors);
      }
      else{
        this.props.loginSuccess(response.jwt, password, response.store);
      }
    });
  }
});

export default connect()(RegisterView);
