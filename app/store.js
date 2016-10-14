import {combineReducers, createStore} from 'redux';
import loginReducer from './reducers/loginReducer';
import vaultReducer from './reducers/vaultReducer';

export default createStore(combineReducers({
  login: loginReducer,
  vault: vaultReducer
}));
