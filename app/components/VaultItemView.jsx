import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {saveVaultItem} from '../actions';
import uuid from 'uuid';
import ModalContainer from './ModalContainer.jsx';

var VaultItemView = withRouter(React.createClass({
  propTypes: {
    vault: React.PropTypes.object
  },
  getInitialState: function(){
    var defaultItem = {
      name: '',
      site: '',
      passwordArray: [],
      password: '',
      username: '',
      showPassword: false,
      showHistory: false
    };
    var item = Object.assign(defaultItem, this.props.vault[this.props.params.itemId]);
    if (item.passwordArray.length){
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
    var password = this.state.showPassword ?
      {
        type: 'text',
        icon: 'visibility'
      } :
      {
        type: 'password',
        icon: 'visibility_off'
      };
    var history = this.state.showHistory ?
      <div>
        {this.state.passwordArray.map(function(elem, i){
          return <div key={i}>{elem}</div>
        })}
      </div>:
      null;
    return (
      <ModalContainer
        modal={history}
        onLeave={this.toggleHistory}>
        <div
          className="vault-item-row">
          <div
            className="vault-item-entry aleft">
            <div>Name</div>
            <input
              value={this.state.name}
              onChange={controlledComponentGenerator('name')}/>
          </div>
          <div
            className="vault-item-entry aright">
            <div>Site</div>
            <input
              value={this.state.site}
              onChange={controlledComponentGenerator('site')}/>
          </div>
        </div>
        <div
          className="vault-item-row">
          <div
            className="vault-item-entry aleft">
            <div>Username</div>
            <input
              value={this.state.username}
              onChange={controlledComponentGenerator('username')}/>
          </div>
          <div
            className="vault-item-entry aright">
            <div>Password</div>
            <div
              className="buttoned-input">
              <input
                type={password.type}
                value={this.state.password}
                onChange={controlledComponentGenerator('password')}/>
              <span
                className="material-icons"
                onClick={this.togglePassword}>{password.icon}</span>
            </div><br/>
            <span
              onClick={this.toggleHistory}
              className="button">
              Password History
            </span>
          </div>
        </div>
        <div
          className="vault-item-row">
          <span
            className="button"
            onClick={this.cancel}>Cancel</span>
          <span
            className="button"
            onClick={this.save}>Save</span>
        </div>



      </ModalContainer>
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
    delete item.showPassword;
    delete item.showHistory;
    if (itemId == 'NEW'){
      itemId = uuid.v4();
    }
    this.props.saveVaultItem(itemId, item);
    this.props.router.goBack();
  },
  togglePassword: function(){
    this.setState({
      showPassword: !this.state.showPassword
    });
  },
  toggleHistory: function(){
    this.setState({
      showHistory: !this.state.showHistory
    });
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
