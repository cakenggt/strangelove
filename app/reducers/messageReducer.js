/* jshint -W138 */
export default function(state = [], action){
  switch (action.type){
    case 'ADD_MESSAGES':
      return [
        ...state,
        ...action.data
      ];
    case 'DELETE_MESSAGE':
      var newList = state.slice();
      newList.splice(action.data, 1);
      return newList;
    case 'CLEAR_MESSAGES':
      return [];
    default:
      return state;
  }
}
