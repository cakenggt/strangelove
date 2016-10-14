/* jshint -W138 */
var defaultState = {
  password: '',
  login: 'PENDING',
  register: false,
  jwt: ''
};

export default function(state = defaultState, action){
  switch (action.type){
    case 'SWITCH_REGISTER':
      return Object.assign({}, state, {
        register: action.data
      });
    case 'LOGIN_SUCCESSFUL':
      return Object.assign({}, state, {
        login: 'SUCCESS',
        password: action.data.password,
        jwt: action.data.jwt
      });
    default:
      return state;
  }
}
