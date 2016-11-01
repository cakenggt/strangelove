/* jshint -W138 */
var defaultState = {
  email: '',
  password: '',
  login: false,
  jwt: '',
  needsTotp: false,
  imgTag: ''
};

export default function(state = defaultState, action){
  switch (action.type){
    case 'LOGIN_SUCCESSFUL':
      return Object.assign({}, state, {
        login: true,
        email: action.data.email,
        password: action.data.password,
        jwt: action.data.jwt,
        needsTotp: action.data.needsTotp
      });
    case 'SET_JWT':
      return Object.assign({}, state, {
        jwt: action.data
      });
    case 'LOGOUT':
      return defaultState;
    case 'SET_NEEDS_TOTP':
      return Object.assign({}, state, {
        needsTotp: action.data.needsTotp,
        imgTag: action.data.imgTag
      });
    case 'CHANGE_PASSWORD':
      return Object.assign({}, state, {
        password: action.data
      });
    case 'NEEDS_TOTP':
      return Object.assign({}, state, {
        email: action.data.email,
        password: action.data.password
      });
    case 'REMOVE_TOTP_IMG':
      return Object.assign({}, state, {
        imgTag: ''
      });
    default:
      return state;
  }
}
