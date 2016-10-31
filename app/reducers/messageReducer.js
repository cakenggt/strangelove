/* jshint -W138 */
export default function(state = [], action){
  switch (action.type){
    case 'ADD_MESSAGES':
      return action.data;
    case 'CLEAR_MESSAGES':
      return [];
    default:
      return state;
  }
}
