import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import ModalView from './ModalView.jsx';
import {login} from '../actions';

var TOTPView = withRouter(React.createClass({
  render: function() {
    return (
      <ModalView
        key="totp">
        <h2>TOTP</h2>
        <input
          id="totp"
          placeholder="TOTP Code"
          autoFocus/>
        <div
          className="button"
          onClick={this.login}>Login</div>
      </ModalView>
    );
  },
  login: function(){
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var totp = document.getElementById('totp').value;
    this.props.login(email, password, this.props.router, totp);
  }
}));

var mapStateToProps = (state) => {
  return {

  }
}

var mapDispatchToProps = (dispatch) => {
  return {
    login: function(email, password, router, totp){
      dispatch(login(email, password, router, totp));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TOTPView);
