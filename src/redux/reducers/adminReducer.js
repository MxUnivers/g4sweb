import {
  GET_ADMINS,
  GET_ADMIN,
  UPDATE_ADMIN,
  ADMINS_LOADING,
  ADMINS_ERROR
} from '../actions/types';

const initialState = {
  admins: [],
  currentAdmin: null,
  loading: false,
  error: null
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMINS_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case GET_ADMINS:
      return {
        ...state,
        admins: action.payload,
        loading: false,
        error: null
      };
    
    case GET_ADMIN:
      return {
        ...state,
        currentAdmin: action.payload,
        loading: false,
        error: null
      };
    
    case UPDATE_ADMIN:
      return {
        ...state,
        admins: state.admins.map(admin => 
          admin._id === action.payload._id ? action.payload : admin
        ),
        currentAdmin: state.currentAdmin && state.currentAdmin._id === action.payload._id 
          ? action.payload 
          : state.currentAdmin,
        loading: false,
        error: null
      };
    
    case ADMINS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    default:
      return state;
  }
};

export default adminReducer;
