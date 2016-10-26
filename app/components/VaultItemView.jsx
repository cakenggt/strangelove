import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import ModalView from './ModalView.jsx';
import {saveVaultItem} from '../actions';
import uuid from 'uuid';

var VaultItemView = withRouter(React.createClass({
  propTypes: {
    vault: React.PropTypes.object
  },
  getInitialState: function(){
    var item = this.props.vault[this.props.params.itemId];
    if (!item){
      item = {
        name: '',
        passwordArray: [],
        password: '',
        username: ''
      };
    }
    else{
      //populate virtual password field
      item.password = item.passwordArray[item.passwordArray.length-1];
    }
    return item;
  },
  render: function(){
    var key = this.props.params.itemId;
    var controlledComponentGenerator = (stateAttr) => {
      return (event) => {
        let newState = {};
        newState[stateAttr] = event.target.value;
        this.setState(newState);
      };
    };
    return (
      <ModalView
        key={key}>
        <div>
          Name
          <input
            value={this.state.name}
            onChange={controlledComponentGenerator('name')}/>
        </div>
        <div>
          Password:
          <input
            value={this.state.password}
            onChange={controlledComponentGenerator('password')}/>
        </div>
        <div>
          Password History: <span>{JSON.stringify(this.state.passwordArray)}</span>
        </div>
        <div>
          Username:
          <input
            value={this.state.username}
            onChange={controlledComponentGenerator('username')}/>
        </div>
        <span
          onClick={this.cancel}>Cancel</span>
        <span
          onClick={this.save}>Save</span>
      </ModalView>
    );
  },
  cancel: function(){
    this.props.router.goBack();
  },
  save: function(){
    var itemId = this.props.params.itemId;
    var item = Object.assign({}, this.state);
    //push password onto passwordArray and delete virtual attribute
    var lastPassword = item.passwordArray[item.passwordArray.length-1];
    if (lastPassword != item.password){
      item.passwordArray.push(item.password);
    }
    delete item.password;
    if (itemId == 'NEW'){
      itemId = uuid.v4();
    }
    this.props.saveVaultItem(itemId, item);
    this.props.router.goBack();
  }
}));

var mapStateToProps = function(state){
  return {
    vault: state.vault
  }
}

var mapDispatchToProps = function(dispatch){
  return {
    saveVaultItem: function(itemId, item){
      dispatch(saveVaultItem(itemId, item));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VaultItemView);
