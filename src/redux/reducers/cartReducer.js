import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM, CLEAR_CART } from '../actions/types';

const initialState = {
  items: [],
  total: 0
};

const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const newItems = [...state.items, {
        product: action.payload.product,
        quantity: action.payload.quantity
      }];
      
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems)
      };
    
    case REMOVE_FROM_CART:
      const filteredItems = state.items.filter(item => 
        item.product._id !== action.payload
      );
      
      return {
        ...state,
        items: filteredItems,
        total: calculateTotal(filteredItems)
      };
    
    case UPDATE_CART_ITEM:
      const updatedItems = state.items.map(item => 
        item.product._id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    
    case CLEAR_CART:
      return {
        ...state,
        items: [],
        total: 0
      };
    
    default:
      return state;
  }
};

export default cartReducer;
