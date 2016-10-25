import React from 'react';
import {connect} from 'react-redux';

var SettingsView = React.createClass({
  getInitialState: function(){
    return {
      imgTag: ''
    }
  },
  render: function(){
    let totpButton = this.props.needsTotp?
      <span
        className="button"
        onClick={this.deleteTotp}>Delete TOTP</span>:
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
    setNeedsTotp(bool){
      dispatch({
        type: 'SET_NEEDS_TOTP',
        data: bool
      });
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsView);
