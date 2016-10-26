import React from 'react';
import {connect} from 'react-redux';
import {changePassword} from '../actions';

var SettingsView = React.createClass({
  getInitialState: function(){
    return {
      imgTag: ''
    }
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
    return (
      <div>
        <h2>Settings</h2>
        <h3>TOTP</h3>
        {totpButton}
        {totpImg}
        <h3>Change Password</h3>
        <input
          type="password"
          id="currentPassword"
          placeholder="Current Password"/><br/>
        <input
          type="password"
          id="newPassword"
          placeholder="New Password"/><br/>
        <input
          type="password"
          id="confirmPassword"
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
    var currentPassword = document.getElementById('currentPassword').value;
    var newPassword = document.getElementById('newPassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
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
