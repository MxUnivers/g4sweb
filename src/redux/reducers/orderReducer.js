import {
  GET_ORDERS,
  GET_ORDER,
  ADD_ORDER,
  UPDATE_ORDER,
  ORDERS_LOADING,
  ORDERS_ERROR
} from '../actions/types';

const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDERS_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
        error: null
      };
    
    case GET_ORDER:
      return {
        ...state,
        currentOrder: action.payload,
        loading: false,
        error: null
      };
    
    case ADD_ORDER:
      return {
        ...state,
        orders: [action.payload.order, ...state.orders],
        loading: false,
        error: null
      };
    
    case UPDATE_ORDER:
      return {
        ...state,
        orders: state.orders.map(order => 
          order._id === action.payload._id ? action.payload : order
        ),
        currentOrder: state.currentOrder && state.currentOrder._id === action.payload._id 
          ? action.payload 
          : state.currentOrder,
        loading: false,
        error: null
      };
    
    case ORDERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    default:
      return state;
  }
};

export default orderReducer;
