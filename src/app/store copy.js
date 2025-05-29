// store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import userReducer from './reducers/userReducer';
import customerReducer from './reducers/customerReducer';
import adminReducer from './reducers/adminReducer';
import productReducer from './reducers/productReducer';
import orderReducer from './reducers/orderReducer';
import categoryReducer from './reducers/categoryReducer';
import brandReducer from './reducers/brandReducer';
import basketReducer from './reducers/basketReducer';



const rootReducer = combineReducers({
    products: productReducer,
    orders: orderReducer,
    categorys: categoryReducer,
    users: userReducer,
    admins: adminReducer,
    customers: customerReducer,
    brands: brandReducer,
    baskets: basketReducer,
});


const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;