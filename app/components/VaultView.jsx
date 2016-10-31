import React from 'react';
import {connect} from 'react-redux';
import {Link, IndexLink, withRouter} from 'react-router';
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
          className={'vault-view bordered '+className}>
          <table
            className="vault-table">
            <thead>
              <tr>
                <th
                  className="aleft">
                  Site
                </th>
                <th
                  className="aright">
                  Username
                </th>
              </tr>
            </thead>
            <tbody>
              {vaultEntries}
            </tbody>
          </table>
          <Link
            className="button"
            to="/vault/item/NEW">Add Item</Link>
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
        onClick={this.goToVaultItem}
        className="vault-entry">
        <td
          className="aleft">
          {entry.site}
        </td>
        <td
          className="aright">
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
