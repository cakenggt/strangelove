import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {login} from '../actions';

var TOTPView = withRouter(React.createClass({
  render: function() {
    return (
      <div
        className="modal">
        <div
          className="modal-content">
          <h2>TOTP</h2>
          <input
            id="totp"
            placeholder="TOTP Code"/>
          <div
            onClick={this.login}>Login</div>
        </div>
      </div>
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
