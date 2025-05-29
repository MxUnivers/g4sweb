import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from './reducers/authReducer';
import adminReducer from './reducers/adminReducer';
import contactReducer from './reducers/contactReducer';

const rootReducer = combineReducers({
  admin: adminReducer,
  auth: authReducer,
  contacts: contactReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
