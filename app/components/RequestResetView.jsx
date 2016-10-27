import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {requestReset} from '../actions';

var RequestResetView = withRouter(React.createClass({
  getInitialState: function(){
    return {
      email: ''
    };
  },
  render: function(){
    return (
      <div>
        <span>Type in your email</span>
        <input
          onChange={this.changeEmail}
          placeholder="Email"/>
        <span
          className="button"
          onClick={this.requestReset}>Send Request to Email</span>
      </div>
    )
  },
  changeEmail: function(e){
    this.setState({
      email: e.target.value
    });
  },
  requestReset: function(){
    this.props.requestReset(this.state.email, this.props.router);
  }
}));

var mapDispatchToProps = function(dispatch){
  return {
    requestReset: function(email, router){
      dispatch(requestReset(email, router));
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(RequestResetView);
