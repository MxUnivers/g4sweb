import API from '../../api/api';
import { toast } from 'sonner';
import {
  GET_ORDERS,
  GET_ORDER,
  ADD_ORDER,
  UPDATE_ORDER,
  ORDERS_LOADING,
  ORDERS_ERROR
} from './types';
import { CLEAR_CART } from './types';

// Action pour récupérer toutes les commandes
export const getOrders = (filters = {}) => async (dispatch) => {
  dispatch({ type: ORDERS_LOADING });
  
  try {
    const params = new URLSearchParams();
    
    if (filters.startdate) params.append('startdate', filters.startdate);
    if (filters.enddate) params.append('enddate', filters.enddate);
    if (filters.status) params.append('status', filters.status);
    
    const queryString = params.toString();
    const url = `/orders/get_orders${queryString ? '?' + queryString : ''}`;
    
    const res = await API.get(url);
    dispatch({
      type: GET_ORDERS,
      payload: res.data.data
    });
    return res.data.data;
  } catch (error) {
    const errorMsg = error.response && error.response.data.message 
      ? error.response.data.message 
      : 'Erreur lors de la récupération des commandes';
    
    // toast.error(errorMsg);
    
    dispatch({
      type: ORDERS_ERROR,
      payload: errorMsg
    });
    
    throw error;
  }
};

// Action pour récupérer une commande par son ID
export const getOrderById = (orderId) => async (dispatch) => {
  dispatch({ type: ORDERS_LOADING });
  
  try {
    const res = await API.get(`/orders/get_order/${orderId}`);
    dispatch({
      type: GET_ORDER,
      payload: res.data.data
    });
    return res.data.data;
  } catch (error) {
    const errorMsg = error.response && error.response.data.message 
      ? error.response.data.message 
      : 'Erreur lors de la récupération de la commande';
    
    toast.error(errorMsg);
    
    dispatch({
      type: ORDERS_ERROR,
      payload: errorMsg
    });
    
    throw error;
  }
};

// Action pour créer une nouvelle commande
export const createOrder = (orderData) => async (dispatch) => {
  dispatch({ type: ORDERS_LOADING });
  
  try {
    const res = await API.post('/orders/create', orderData);
    dispatch({
      type: ADD_ORDER,
      payload: res.data.data
    });
    
    // Vider le panier après une commande réussie
    dispatch({ type: CLEAR_CART });
    
    toast.success(res?.data?.message ||'Commande passée avec succès!');
    window.location.href = "";
    return res.data.data;
  } catch (error) {
    const errorMsg = error.response && error.response.data.message 
      ? error.response.data.message 
      : 'Erreur lors de la création de la commande';
    
    toast.error(errorMsg);
    
    dispatch({
      type: ORDERS_ERROR,
      payload: errorMsg
    });
    
    throw error;
  }
};

// Action pour ajouter un article à une commande
export const addItemToOrder = (orderId, itemData) => async (dispatch) => {
  dispatch({ type: ORDERS_LOADING });
  
  try {
    const res = await API.post(`/orders/add/${orderId}/items`, itemData);
    dispatch({
      type: UPDATE_ORDER,
      payload: res.data.data
    });
    
    toast.success('Article ajouté à la commande!');
    return res.data.data;
  } catch (error) {
    const errorMsg = error.response && error.response.data.message 
      ? error.response.data.message 
      : 'Erreur lors de l\'ajout de l\'article';
    
    toast.error(errorMsg);
    
    dispatch({
      type: ORDERS_ERROR,
      payload: errorMsg
    });
    
    throw error;
  }
};

// Action pour supprimer un article d'une commande
export const removeItemFromOrder = (orderId, itemId) => async (dispatch) => {
  dispatch({ type: ORDERS_LOADING });
  
  try {
    const res = await API.delete(`/orders/delete/${orderId}/items/${itemId}`);
    dispatch({
      type: UPDATE_ORDER,
      payload: res.data.data
    });
    
    toast.success('Article retiré de la commande!');
    return res.data.data;
  } catch (error) {
    const errorMsg = error.response && error.response.data.message 
      ? error.response.data.message 
      : 'Erreur lors de la suppression de l\'article';
    
    toast.error(errorMsg);
    
    dispatch({
      type: ORDERS_ERROR,
      payload: errorMsg
    });
    
    throw error;
  }
};

// Action pour mettre à jour la quantité d'un article dans une commande
export const updateItemQuantity = (orderId, itemId, quantity) => async (dispatch) => {
  dispatch({ type: ORDERS_LOADING });
  try {
    const res = await API.put(`/orders/edit/${orderId}/items/${itemId}`, { quantity });
    dispatch({
      type: UPDATE_ORDER,
      payload: res.data.data
    });
    
    toast.success('Quantité mise à jour!');
    return res.data.data;
  } catch (error) {
    const errorMsg = error.response && error.response.data.message 
      ? error.response.data.message 
      : 'Erreur lors de la mise à jour de la quantité';
    
    toast.error(errorMsg);
    
    dispatch({
      type: ORDERS_ERROR,
      payload: errorMsg
    });
    
    throw error;
  }
};
