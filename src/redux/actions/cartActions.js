import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM, CLEAR_CART } from './types';
import { toast } from 'sonner';

// Action pour ajouter un produit au panier
export const addToCart = (product, quantity = 1) => (dispatch, getState) => {
  const { cart } = getState();
  const existingItem = cart.items.find(item => item.product._id === product._id);
  
  if (existingItem) {
    // Si le produit existe déjà dans le panier, on augmente la quantité
    dispatch(updateCartItem(product._id, existingItem.quantity + quantity));
    toast.success(`Quantité de ${product.name} mise à jour dans le panier`);
  } else {
    // Sinon, on ajoute le nouveau produit
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product,
        quantity
      }
    });
    toast.success(`${product.name} ajouté au panier`);
  }
  
  // Enregistrer le panier dans le localStorage
  localStorage.setItem('cart', JSON.stringify(getState().cart));
};

// Action pour retirer un produit du panier
export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: productId
  });
  
  toast.info(`Produit retiré du panier`);
  
  // Mettre à jour le localStorage
  localStorage.setItem('cart', JSON.stringify(getState().cart));
};

// Action pour mettre à jour la quantité d'un produit dans le panier
export const updateCartItem = (productId, quantity) => (dispatch, getState) => {
  if (quantity <= 0) {
    return dispatch(removeFromCart(productId));
  }
  
  dispatch({
    type: UPDATE_CART_ITEM,
    payload: {
      productId,
      quantity
    }
  });
  
  // Mettre à jour le localStorage
  localStorage.setItem('cart', JSON.stringify(getState().cart));
};

// Action pour vider le panier
export const clearCart = () => (dispatch) => {
  dispatch({ type: CLEAR_CART });
  localStorage.removeItem('cart');
  toast.info('Panier vidé');
};

// Action pour initialiser le panier depuis le localStorage
export const initCart = () => (dispatch) => {
  const savedCart = localStorage.getItem('cart');
  
  if (savedCart) {
    const parsedCart = JSON.parse(savedCart);
    
    parsedCart.items.forEach(item => {
      dispatch({
        type: ADD_TO_CART,
        payload: {
          product: item.product,
          quantity: item.quantity
        }
      });
    });
  }
};