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
      <div
        className="center">
        <div
          className="bordered">
          <div>
            <input
              onChange={this.changeEmail}
              value={this.state.email}
              placeholder="Email"/>
          </div>
          <span
            className="button"
            onClick={this.requestReset}>Send Request to Email</span>
        </div>
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
