/* jshint -W138 */
export default function(state = {}, action){
  switch (action.type){
    case 'LOGIN_SUCCESSFUL':
      return action.data.vault;
    default:
      return state;
  }
}
