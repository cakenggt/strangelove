/* jshint -W138 */
var defaultState = {
  email: '',
  password: '',
  login: false,
  jwt: ''
};

export default function(state = defaultState, action){
  switch (action.type){
    case 'LOGIN_SUCCESSFUL':
      return Object.assign({}, state, {
        login: true,
        email: action.data.email,
        password: action.data.password,
        jwt: action.data.jwt
      });
    default:
      return state;
  }
}
