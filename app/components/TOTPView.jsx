import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import ModalView from './ModalView.jsx';
import {login} from '../actions';

var TOTPView = withRouter(React.createClass({
  propTypes: {
    email: React.PropTypes.string.isRequired,
    password: React.PropTypes.string.isRequired
  },
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
      <ModalView
        key="totp">
        <input
          placeholder="TOTP Code"
          onChange={controlledComponentChangeGenerator('totp')}
          onKeyDown={controlledComponentKeyDownGenerator('totp')}
          value={this.state.totp}
          autoFocus/>
        <div
          className="button"
          onClick={this.login}>Login</div>
      </ModalView>
    );
  },
  login: function(){
    var email = this.props.email;
    var password = this.props.password;
    var totp = this.state.totp;
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
