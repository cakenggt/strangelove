import React from 'react';
import {withRouter} from 'react-router';

var ModalView = withRouter(React.createClass({
  propTypes: {
    onLeave: React.PropTypes.func
  },
  render: function(){
    return (
      <div
        className="modal"
        onClick={this.goBack}>
          <div
            className="modal-content"
            onClick={this.stopProp}>
            {this.props.children}
          </div>
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

export default ModalView;
