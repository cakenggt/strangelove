import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {register} from '../actions';

var RegisterView = withRouter(React.createClass({
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
          placeholder="confirm password"/>
        <div
          className="button"
          onClick={this.register}>Register</div>
      </div>
    );
  },
  register: function(){
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
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
