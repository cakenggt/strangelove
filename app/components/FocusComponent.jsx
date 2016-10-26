import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default React.createClass({
  render: function(){
    var transitionMs = 500;
    return (
      <ReactCSSTransitionGroup
        transitionName="focus-component"
        transitionEnterTimeout={transitionMs}
        transitionLeaveTimeout={transitionMs}>
        {this.props.children}
      </ReactCSSTransitionGroup>
    );
  }
});
