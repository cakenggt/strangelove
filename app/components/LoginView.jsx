import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {login} from '../actions';

var LoginView = withRouter(React.createClass({
  render: function() {
    return (
      <div>
        <h2>Login</h2>
        <input
          id="email"
          placeholder="email"/><br/>
        <input
          id="password"
          placeholder="password"
          type="password"/>
        <div
          onClick={this.login}>Login</div>
      </div>
    );
  },
  login: function(){
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
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
