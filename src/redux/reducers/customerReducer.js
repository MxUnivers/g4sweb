import {
  GET_CUSTOMERS,
  GET_CUSTOMER,
  CUSTOMERS_LOADING,
  CUSTOMERS_ERROR
} from '../actions/types';

const initialState = {
  customers: [],
  currentCustomer: null,
  loading: false,
  error: null
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CUSTOMERS_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case GET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload,
        loading: false,
        error: null
      };
    
    case GET_CUSTOMER:
      return {
        ...state,
        currentCustomer: action.payload,
        loading: false,
        error: null
      };
    
    case CUSTOMERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    default:
      return state;
  }
};

export default customerReducer;