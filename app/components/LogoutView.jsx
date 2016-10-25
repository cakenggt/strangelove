import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';

var LoginView = withRouter(React.createClass({
  componentDidMount: function(){
    this.props.logout();
    this.props.router.push('/login');
  },
  render: function(){
    return null;
  }
}));

var mapDispatchToProps = (dispatch) => {
  return {
    logout: function(){
      dispatch({
        type: 'LOGOUT'
      });
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(LoginView);
