import React from 'react';

var AboutView = React.createClass({
  render: function(){
    return (
      <div
        className="bordered">
        <h2>What is Frost?</h2>
        <p>
          Frost is a password manager.
        </p>
      </div>
    );
  }
});

export default AboutView;
