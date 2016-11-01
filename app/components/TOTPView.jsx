import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {loginTOTP} from '../actions';

var TOTPView = withRouter(React.createClass({
  getInitialState: function(){
    return {
      totp: ''
    };
  },
  render: function() {
    var controlledComponentChangeGenerator = (stateAttr) => {
      return (event) => {
        let newState = {};
        newState[stateAttr] = event.target.value;
        this.setState(newState);
      };
    };
    var controlledComponentKeyDownGenerator = (stateAttr) => {
      return (event) => {
        if (event.key == 'Enter'){
          event.preventDefault();
          this.login();
        }
      };
    };
    return (
      <div>
        <input
          placeholder="TOTP Code"
          onChange={controlledComponentChangeGenerator('totp')}
          onKeyDown={controlledComponentKeyDownGenerator('totp')}
          value={this.state.totp}
          autoFocus/><br/>
        <span
          className="button"
          onClick={this.login}>Login</span>
      </div>
    );
  },
  login: function(){
    var totp = this.state.totp;
    this.props.loginTOTP(totp, this.props.router);
  }
}));

var mapStateToProps = (state) => {
  return {

  }
}

var mapDispatchToProps = (dispatch) => {
  return {
    loginTOTP: function(totp, router){
      dispatch(loginTOTP(totp, router));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TOTPView);
