import React from 'react';
import {connect} from 'react-redux';
import {changePassword} from '../actions';

var SettingsView = React.createClass({
  getInitialState: function(){
    return {
      imgTag: '',
      password: '',
      newPassword: '',
      confirmPassword: ''
    };
  },
  render: function(){
    let totpButton = this.props.needsTotp?
      <div>
        <span
          className="button"
          onClick={this.requireTotp}>Show TOTP</span>
        <span
          className="button"
          onClick={this.deleteTotp}>Delete TOTP</span>
      </div>:
      <span
        className="button"
        onClick={this.requireTotp}>Require TOTP</span>;
    let totpImg = this.state.imgTag ?
      <div dangerouslySetInnerHTML={{__html: this.state.imgTag}}></div> :
      null;
    var controlledComponentChangeGenerator = (stateAttr) => {
      return (event) => {
        let newState = {};
        newState[stateAttr] = event.target.value;
        this.setState(newState);
      };
    };
    return (
      <div
        className="bordered">
        <h2>TOTP</h2>
        {totpButton}
        {totpImg}
        <h2>Change Password</h2>
        <input
          type="password"
          onChange={controlledComponentChangeGenerator('password')}
          value={this.state.password}
          placeholder="Current Password"/><br/>
        <input
          type="password"
          onChange={controlledComponentChangeGenerator('newPassword')}
          value={this.state.newPassword}
          placeholder="New Password"/><br/>
        <input
          type="password"
          onChange={controlledComponentChangeGenerator('confirmPassword')}
          value={this.state.confirmPassword}
          placeholder="Confirm Password"/><br/>
        <span
          className="button"
          onClick={this.changePassword}>Change Password</span>
      </div>
    );
  },
  deleteTotp: function(){
    fetch('/api/v1/totp', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.props.jwt
      },
      method: 'DELETE'
    })
    .then(function(response){
      return response.json();
    })
    .then((response)=>{
      this.setState({
        imgTag: ''
      });
      this.props.setNeedsTotp(false);
    });
  },
  requireTotp: function(){
    fetch('/api/v1/totp', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.props.jwt
      },
      method: 'GET'
    })
    .then(function(response){
      return response.json();
    })
    .then((response)=>{
      this.setState({
        imgTag: response.imgTag
      });
      this.props.setNeedsTotp(true);
    });
  },
  changePassword: function(){
    var currentPassword = this.state.password;
    var newPassword = this.state.newPassword;
    var confirmPassword = this.state.confirmPassword;
    this.props.changePassword(
      currentPassword,
      newPassword,
      confirmPassword
    );
  }
});

var mapStateToProps = function(state){
  return {
    needsTotp: state.connect.needsTotp,
    jwt: state.connect.jwt
  }
}

var mapDispatchToProps = function(dispatch){
  return {
    setNeedsTotp: function(bool){
      dispatch({
        type: 'SET_NEEDS_TOTP',
        data: bool
      });
    },
    changePassword: function(currentPassword, newPassword, confirmPassword){
      dispatch(changePassword(currentPassword, newPassword, confirmPassword));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsView);
