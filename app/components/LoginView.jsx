import React from 'react';
import {connect} from 'react-redux';

var LoginView = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Login</h2>
        <span
          id="error"></span>
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
    fetch('/api/v1/login', {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Basic '+btoa(email+':'+password)
      },
      method: 'POST'
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

var mapStateToProps = (state) => {
  return {

  }
}

export default connect(
  mapStateToProps
)(LoginView);
