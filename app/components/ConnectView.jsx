import React from 'react';
import {connect} from 'react-redux';
import RegisterView from './RegisterView.jsx';
import LoginView from './LoginView.jsx';
import sjcl from 'sjcl';

var ConnectView = React.createClass({
  render: function() {
    var component = this.props.register ?
    <RegisterView
      switchRegister={this.props.switchRegister}
      loginSuccess={this.props.loginSuccess}/> :
    <LoginView
      switchRegister={this.props.switchRegister}
      loginSuccess={this.props.loginSuccess}/>;
    return component;
  }
});

var mapStateToProps = (state) => {
  return {
    register: state.connect.register
  }
}

var mapDispatchToProps = (dispatch) => {
  return {
    switchRegister: function(register){
      dispatch({
        type: 'SWITCH_REGISTER',
        data: register
      });
    },
    loginSuccess: function(jwt, password, vault){
      if (!vault){
        vault = {};
      }
      else{
        vault = JSON.parse(sjcl.decrypt(password, vault));
      }
      dispatch({
        type: 'LOGIN_SUCCESSFUL',
        data: {
          jwt: jwt,
          password: password,
          vault: vault
        }
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectView);
