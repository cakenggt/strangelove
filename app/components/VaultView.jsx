import React from 'react';
import {connect} from 'react-redux';
import {Link, IndexLink} from 'react-router';
import sjcl from 'sjcl';
import {uploadVault} from '../actions';
import FocusComponent from './FocusComponent.jsx';

var VaultView = React.createClass({
  render: function() {
    var className = this.props.children ?
      'focus blur' :
      'focus';
    return (
      <div>
        <div
          className={className}>
          Vault
          <div
            onClick={this.uploadVault}>Upload</div>
          <Link to="/vault/item/x">Add Item</Link>
        </div>
        <FocusComponent>
          {this.props.children}
        </FocusComponent>
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
