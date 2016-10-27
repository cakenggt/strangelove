import React from 'react';
import {connect} from 'react-redux';
import {Link, IndexLink, withRouter} from 'react-router';
import sjcl from 'sjcl';
import {uploadVault} from '../actions';
import FocusComponent from './FocusComponent.jsx';

var VaultView = React.createClass({
  render: function() {
    var className = this.props.children ?
      'focus blur' :
      'focus';
    var vaultItemIds = Object.keys(this.props.vault);
    var vaultEntries = vaultItemIds.map((elem)=>{
      var entry = this.props.vault[elem];
      return <VaultEntry entry={entry} itemId={elem} key={elem}/>
    });
    return (
      <div
        className="modal-container">
        <div
          className={className}>
          Vault
          <Link to="/vault/item/NEW">Add Item</Link>
          <table>
            <tbody>
              {vaultEntries}
            </tbody>
          </table>
        </div>
        <FocusComponent>
          {this.props.children}
        </FocusComponent>
      </div>
    );
  }
});

var VaultEntry = withRouter(React.createClass({
  render: function(){
    var entry = this.props.entry;
    return (
      <tr
        onClick={this.goToVaultItem}>
        <td>
          {entry.name}
        </td>
        <td>
          {entry.username}
        </td>
      </tr>
    )
  },
  goToVaultItem: function(){
    this.props.router.push('/vault/item/'+this.props.itemId);
  }
}));

var mapStateToProps = function(state){
  return {
    vault: state.vault
  };
}

export default connect(
  mapStateToProps
)(VaultView);
