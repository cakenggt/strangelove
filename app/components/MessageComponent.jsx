import React from 'react';

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
      <div>
        {spans}
      </div>
    )
  }
});

export default MessageComponent;
