import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_LOADING,
  AUTH_ERROR
} from '../actions/types';

// Initialiser le state avec les valeurs du localStorage s'il existe
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
const token = localStorage.getItem('token');

const initialState = {
  token: token || null,
  isAuthenticated: !!token,
  user: user || null,
  isAdmin: user && user.role === 'admin',
  loading: false,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        user: action.payload.user,
        isAdmin: action.payload.isAdmin,
        loading: false,
        error: null
      };
    
    case LOGIN_FAIL:
    case AUTH_ERROR:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        isAdmin: false,
        loading: false,
        error: action.payload
      };
    
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        isAdmin: false,
        loading: false,
        error: null
      };
    
    default:
      return state;
  }
};

export default authReducer;
