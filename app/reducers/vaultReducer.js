/* jshint -W138 */
export default function(state = {}, action){
  switch (action.type){
    case 'LOGIN_SUCCESSFUL':
      return action.data.vault;
    case 'SAVE_VAULT_ITEM':
      let item = action.data.item;
      let itemId = action.data.itemId;
      let change = {};
      change[itemId] = item;
      return Object.assign({}, state, change);
    default:
      return state;
  }
}
