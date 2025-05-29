import {
  GET_CATEGORIES,
  GET_CATEGORY,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  CATEGORIES_LOADING,
  CATEGORIES_ERROR
} from '../actions/types';

const initialState = {
  categories: [],
  currentCategory: null,
  loading: false,
  error: null
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORIES_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        loading: false,
        error: null
      };
    
    case GET_CATEGORY:
      return {
        ...state,
        currentCategory: action.payload,
        loading: false,
        error: null
      };
    
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [action.payload, ...state.categories],
        loading: false,
        error: null
      };
    
    case UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map(category => 
          category._id === action.payload._id ? action.payload : category
        ),
        currentCategory: action.payload,
        loading: false,
        error: null
      };
    
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(category => category._id !== action.payload),
        loading: false,
        error: null
      };
    
    case CATEGORIES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    default:
      return state;
  }
};

export default categoryReducer;
