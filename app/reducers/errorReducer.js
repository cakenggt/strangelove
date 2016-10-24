/* jshint -W138 */
export default function(state = [], action){
  switch (action.type){
    case 'ADD_ERRORS':
      return [
        ...state,
        ...action.data
      ];
    case 'CLEAR_ERRORS':
      return [];
    default:
      return state;
  }
}
