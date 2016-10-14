import React from 'react';
import {connect} from 'react-redux';
import {encrypt} from '../cryptoUtil';
import sjcl from 'sjcl';

var VaultView = React.createClass({
  render: function() {
    return (
      <div>
        Vault
        <span
          id="error"></span>
        <span
          onClick={this.uploadVault}>Upload</span>
      </div>
    );
  },
  uploadVault: function(){
    var encrypted = sjcl.encrypt(
      this.props.password,
      JSON.stringify(this.props.vault)
    );
    fetch('/api/v1/store', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.props.jwt
      },
      method: 'POST',
      body: JSON.stringify({
        store: encrypted
      })
    })
    .then(function(response){
      return response.json();
    })
    .then((response)=>{
      if (response.errors.length){
        document.getElementById('error').innerHTML = JSON.stringify(response.errors);
      }
    });
  }
});

var mapStateToProps = function(state){
  return {
    vault: state.vault,
    jwt: state.connect.jwt,
    password: state.connect.password
  };
}

var mapDispatchToProps = function(dispatch){
  return {

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VaultView);
