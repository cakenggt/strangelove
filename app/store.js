import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import connectReducer from './reducers/connectReducer';
import vaultReducer from './reducers/vaultReducer';
import messageReducer from './reducers/messageReducer';

export default createStore(combineReducers({
    connect: connectReducer,
    messages: messageReducer,
    vault: vaultReducer
  }),
  applyMiddleware(thunk)
);
