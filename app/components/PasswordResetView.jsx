import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {resetPassword} from '../actions';

var PasswordResetView = withRouter(React.createClass({
  getInitialState: function(){
    return {
      newPassword: '',
      confirmPassword: ''
    }
  },
  render: function(){
    var controlComponent = (id)=>{
      return (e)=>{
        var stateChange = {};
        stateChange[id] = e.target.value;
        this.setState(stateChange);
      }
    };
    return (
      <div>
        <span>If you reset your password, you will lose access to your vault!</span>
        <input
          placeholder="New Password"
          onChange={controlComponent('newPassword')}/><br/>
        <input
          placeholder="Confirm Password"
          onChange={controlComponent('confirmPassword')}/><br/>
        <span
          className="button"
          onClick={this.resetPassword}>Reset</span>
      </div>
    );
  },
  resetPassword: function(){
    this.props.setJWT(this.props.params.code);
    this.props.resetPassword(
      this.state.newPassword,
      this.state.confirmPassword,
      this.props.router
    );
  }
}));

var mapDispatchToProps = function(dispatch){
  return {
    resetPassword: function(newPassword, confirmPassword, router){
      dispatch(resetPassword(newPassword, confirmPassword, router));
    },
    setJWT: function(code){
      dispatch({
        type: 'SET_JWT',
        data: code
      });
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(PasswordResetView);
