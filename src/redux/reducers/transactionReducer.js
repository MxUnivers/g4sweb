import {
  GET_TRANSACTIONS,
  GET_TRANSACTION,
  UPDATE_TRANSACTION,
  TRANSACTIONS_LOADING,
  TRANSACTIONS_ERROR
} from '../actions/types';

const initialState = {
  transactions: [],
  currentTransaction: null,
  loading: false,
  error: null
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRANSACTIONS_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
        loading: false,
        error: null
      };
    
    case GET_TRANSACTION:
      return {
        ...state,
        currentTransaction: action.payload,
        loading: false,
        error: null
      };
    
    case UPDATE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.map(transaction => 
          transaction._id === action.payload._id ? action.payload : transaction
        ),
        currentTransaction: state.currentTransaction && state.currentTransaction._id === action.payload._id 
          ? action.payload 
          : state.currentTransaction,
        loading: false,
        error: null
      };
    
    case TRANSACTIONS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    default:
      return state;
  }
};

export default transactionReducer;
