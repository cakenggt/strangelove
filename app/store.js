import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import connectReducer from './reducers/connectReducer';
import vaultReducer from './reducers/vaultReducer';
import errorReducer from './reducers/errorReducer';

export default createStore(combineReducers({
    connect: connectReducer,
    errors: errorReducer,
    vault: vaultReducer
  }),
  applyMiddleware(thunk)
);
