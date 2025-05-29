import {
  GET_PRODUCTS,
  GET_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  PRODUCTS_LOADING,
  PRODUCTS_ERROR
} from '../actions/types';

const initialState = {
  products: [],
  currentProduct: null,
  featuredProducts: [],
  newProducts: [],
  loading: false,
  error: null
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case GET_PRODUCTS:
      // Identifie les produits en vedette (les 4 plus récents pour cet exemple)
      const sortedProducts = [...action.payload].sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      
      return {
        ...state,
        products: action.payload,
        // Les 4 produits les plus récents comme produits en vedette
        featuredProducts: sortedProducts.slice(0, 4),
        // Les 8 produits les plus récents comme nouveaux produits
        newProducts: sortedProducts.slice(0, 8),
        loading: false,
        error: null
      };
    
    case GET_PRODUCT:
      return {
        ...state,
        currentProduct: action.payload,
        loading: false,
        error: null
      };
    
    case ADD_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products],
        loading: false,
        error: null
      };
    
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map(product => 
          product._id === action.payload._id ? action.payload : product
        ),
        currentProduct: action.payload,
        loading: false,
        error: null
      };
    
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => product._id !== action.payload),
        loading: false,
        error: null
      };
    
    case PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    default:
      return state;
  }
};

export default productReducer;
