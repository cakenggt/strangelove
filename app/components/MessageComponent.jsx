import React from 'react';
import {connect} from 'react-redux';

var MessageComponent = React.createClass({
  propTypes: {
    message: React.PropTypes.string,
    index: React.PropTypes.number
  },
  render: function(){
    return (
      <div>
        <span>{this.props.message}</span>
        <span
          onClick={this.delete}>X</span>
      </div>
    )
  },
  delete: function(){
    this.props.delete(this.props.index);
  }
});

var mapDispatchToProps = function(dispatch){
  return {
    delete: function(index){
      dispatch({
        type: 'DELETE_MESSAGE',
        data: index
      });
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(MessageComponent);
