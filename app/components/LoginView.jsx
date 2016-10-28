import React from 'react';
import {withRouter, Link} from 'react-router';
import {connect} from 'react-redux';
import {login} from '../actions';
import FocusComponent from './FocusComponent.jsx';

var LoginView = withRouter(React.createClass({
  render: function() {
    var className = this.props.children ?
      'focus blur' :
      'focus';
    return (
      <div
        className="modal-container">
        <div
          className={className}>
          <h2>Login</h2>
          <input
            id="email"
            placeholder="email"
            autoFocus/><br/>
          <input
            id="password"
            placeholder="password"
            type="password"/>
          <div
            className="button"
            onClick={this.login}>Login</div>
          <Link 
            to="/reset"
            className="button">Forgot Your Password?</Link>
        </div>
        <FocusComponent>
          {this.props.children}
        </FocusComponent>
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
