import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import categoryReducer from './reducers/categoryReducer';
import productReducer from './reducers/productReducer';
import authReducer from './reducers/authReducer';
import orderReducer from './reducers/orderReducer';
import customerReducer from './reducers/customerReducer';
import transactionReducer from './reducers/transactionReducer';
import cartReducer from './reducers/cartReducer';
import postalcodeReducer from './reducers/postalcodeReducer';

const rootReducer = combineReducers({
  categories: categoryReducer,
  products: productReducer,
  auth: authReducer,
  orders: orderReducer,
  customers: customerReducer,
  transactions: transactionReducer,
  cart: cartReducer,
  postalcodes: postalcodeReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
