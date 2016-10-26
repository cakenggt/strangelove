import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {uploadVault} from '../actions';

var VaultItemView = withRouter(React.createClass({
  propTypes: {
    vault: React.PropTypes.object
  },
  render: function(){
    var item = this.props.vault[this.props.params.itemId];
    if (!item){
      item = {
        name: '',
        passwordArray: [],
        username: ''
      };
    }
    var key = this.props.params.itemId ?
      this.props.params.itemId :
      'newVaultItem';
    return (
      <div
        className="modal"
        key={key}>
        <div
          className="modal-content">
          <div>Name: {item.name}</div>
          <div>Password: {item.passwordArray[item.passwordArray.length-1]}</div>
          <div>Password Array: {item.passwordArray}</div>
          <div>Username: {item.username}</div>
          <div
            onClick={this.cancel}>Cancel</div>
        </div>
      </div>
    );
  },
  cancel: function(){
    this.props.router.goBack();
  },
  save: function(){
    //TODO if no itemId is given, then create a new entry, else modify old one
    //Then modify state and upload vault using an action creator
  }
}));

var mapStateToProps = function(state){
  return {
    vault: state.vault
  }
}

export default connect(
  mapStateToProps
)(VaultItemView);
