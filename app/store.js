import {combineReducers, createStore} from 'redux';
import connectReducer from './reducers/connectReducer';
import vaultReducer from './reducers/vaultReducer';

export default createStore(combineReducers({
  connect: connectReducer,
  vault: vaultReducer
}));
