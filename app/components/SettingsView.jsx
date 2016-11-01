import React from 'react';
import {connect} from 'react-redux';
import ModalContainer from './ModalContainer.jsx';
import {changePassword, setNeedsTotp} from '../actions';

var SettingsView = React.createClass({
  getInitialState: function(){
    return {
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
          onClick={this.showTotp}>Show QR Code</span>
      </div>:
      null;
    let totpImg = this.props.imgTag ?
      <div dangerouslySetInnerHTML={{__html: this.props.imgTag}}></div>:
      null;
    var controlledComponentChangeGenerator = (stateAttr) => {
      return (event) => {
        let newState = {};
        newState[stateAttr] = event.target.value;
        this.setState(newState);
      };
    };
    return (

      <ModalContainer
        modal={totpImg}
        onLeave={this.props.removeTotpImg}>
        <div
          className="bordered">
          <h2>Multifactor</h2>
          <input
            type="checkbox"
            id="totpCheck"
            checked={this.props.needsTotp}
            onChange={this.toggleTotp}/>
          <label htmlFor="totpCheck"><span><span/></span>Require Multifactor</label>
          {totpButton}
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
      </ModalContainer>
    );
  },
  toggleTotp: function(e){
    this.props.setNeedsTotp(e.target.checked);
  },
  showTotp: function(){
    this.props.setNeedsTotp(true);
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
    jwt: state.connect.jwt,
    imgTag: state.connect.imgTag
  }
}

var mapDispatchToProps = function(dispatch){
  return {
    setNeedsTotp: function(bool){
      dispatch(setNeedsTotp(bool));
    },
    changePassword: function(currentPassword, newPassword, confirmPassword){
      dispatch(changePassword(currentPassword, newPassword, confirmPassword));
    },
    removeTotpImg: function(){
      dispatch({
        type: 'REMOVE_TOTP_IMG'
      });
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsView);
