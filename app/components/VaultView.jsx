import React from 'react';
import {connect} from 'react-redux';

var VaultView = React.createClass({
  render: function() {
    return (
      <div>
        Vault
      </div>
    );
  }
});

var mapStateToProps = function(state){
  return {
    vault: state.vault
  };
}

export default connect(mapStateToProps)(VaultView);
