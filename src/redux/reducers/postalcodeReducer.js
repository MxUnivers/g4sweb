import {
  GET_POSTALCODES,
  GET_POSTALCODE,
  ADD_POSTALCODE,
  UPDATE_POSTALCODE,
  DELETE_POSTALCODE,
  POSTALCODES_LOADING,
  POSTALCODES_ERROR
} from '../actions/types';

const initialState = {
  postalcodes: [],
  currentPostalcode: null,
  loading: false,
  error: null
};

const postalcodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTALCODES_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case GET_POSTALCODES:
      return {
        ...state,
        postalcodes: action.payload,
        loading: false,
        error: null
      };
    
    case GET_POSTALCODE:
      return {
        ...state,
        currentPostalcode: action.payload,
        loading: false,
        error: null
      };
    
    case ADD_POSTALCODE:
      return {
        ...state,
        postalcodes: [action.payload, ...state.postalcodes],
        loading: false,
        error: null
      };
    
    case UPDATE_POSTALCODE:
      return {
        ...state,
        postalcodes: state.postalcodes.map(POSTALCODE => 
          POSTALCODE._id === action.payload._id ? action.payload : POSTALCODE
        ),
        currentPostalcode: action.payload,
        loading: false,
        error: null
      };
    
    case DELETE_POSTALCODE:
      return {
        ...state,
        postalcodes: state.postalcodes.filter(POSTALCODE => POSTALCODE._id !== action.payload),
        loading: false,
        error: null
      };
    
    case POSTALCODES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    default:
      return state;
  }
};

export default postalcodeReducer;
