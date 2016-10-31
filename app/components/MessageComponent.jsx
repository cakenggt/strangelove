import React from 'react';
import {connect} from 'react-redux';
import ModalView from './ModalView.jsx';

var MessageComponent = React.createClass({
  render: function(){
    var spans = this.props.messages.map(function(elem, i){
      return (
        <div
          key={i}>
          <span>{elem}</span>
        </div>
        );
    });
    return (
      <ModalView
        onLeave={this.props.clearMessages}>
        {spans}
      </ModalView>
    )
  },
  delete: function(){
    this.props.delete(this.props.index);
  }
});

var mapDispatchToProps = function(dispatch){
  return {
    clearMessages: function(){
      dispatch({
        type: 'CLEAR_MESSAGES'
      });
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(MessageComponent);
