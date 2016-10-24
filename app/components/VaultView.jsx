import React from 'react';
import {connect} from 'react-redux';
import sjcl from 'sjcl';
import {uploadVault} from '../actions';

var VaultView = React.createClass({
  render: function() {
    return (
      <div>
        Vault
        <span
          onClick={this.uploadVault}>Upload</span>
      </div>
    );
  },
  uploadVault: function(){
    this.props.uploadVault(
      this.props.vault,
      this.props.password,
      this.props.jwt
    );
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
    uploadVault: function(vault, password, jwt){
      dispatch(uploadVault(vault, password, jwt));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VaultView);
