import React from 'react';
import {withRouter} from 'react-router';
import FocusComponent from './FocusComponent.jsx';

var ModalContainer = withRouter(React.createClass({
  propTypes: {
    onLeave: React.PropTypes.func,
    modal: React.PropTypes.node
  },
  render: function(){
    var className = this.props.modal ?
      'focus blur' :
      'focus';
    var modal = this.props.modal ?
      <div
        className="modal"
        onClick={this.goBack}>
          <div
            className="modal-content"
            onClick={this.stopProp}>
            {this.props.modal}
          </div>
      </div>:
      null;
    return (
      <div
        className="modal-container">
        <div
          className={className}>
          {this.props.children}
        </div>
        <FocusComponent>
          {modal}
        </FocusComponent>
      </div>
    );
  },
  goBack: function(){
    if (this.props.onLeave){
      this.props.onLeave();
    }
    else{
      this.props.router.goBack();
    }
  },
  stopProp: function(e){
    e.stopPropagation();
  }
}));

export default ModalContainer;
