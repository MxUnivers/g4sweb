import API from '../../api/api';
import { toast } from 'sonner';
import {
  GET_PRODUCTS,
  GET_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  PRODUCTS_LOADING,
  PRODUCTS_ERROR
} from './types';

// Action pour récupérer tous les produits
export const getProducts = (filters = {}) => async (dispatch) => {
  dispatch({ type: PRODUCTS_LOADING });
  
  try {
    // Construction des query params pour les filtres
    const params = new URLSearchParams();
    
    if (filters.categoryId) params.append('categoryId', filters.categoryId);
    if (filters.name) params.append('name', filters.name);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    
    const queryString = params.toString();
    const url = `/products/get_products${queryString ? '?' + queryString : ''}`;
    
    const res = await API.get(url);
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data.data
    });
    return res.data.data;
  } catch (error) {
    const errorMsg = error.response && error.response.data.message 
      ? error.response.data.error 
      : 'Erreur lors de la récupération des produits';
    
    //toast.error(errorMsg);
    
    dispatch({
      type: PRODUCTS_ERROR,
      payload: errorMsg
    });
    
    throw error;
  }
};

// Action pour récupérer un produit par son ID
export const getProductById = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCTS_LOADING });
  try {
    const res = await API.get(`/products/get_product/${productId}`);
    
    // Vérifie si le produit existe vraiment
    

    // console.log(res.data)
    dispatch({
      type: GET_PRODUCT,
      payload: res.data.data
    });
  } catch (error) {
    const errorMsg = error.response?.data?.message || 'Erreur lors de la récupération du produit';
    dispatch({
      type: PRODUCTS_ERROR,
      payload: errorMsg
    });
    throw error;
  }
};

// Action pour créer un nouveau produit
export const createProduct = (productData) => async (dispatch) => {
  dispatch({ type: PRODUCTS_LOADING });
  
  try {
    const res = await API.post('/products/create', productData);
    dispatch({
      type: ADD_PRODUCT,
      payload: res.data.data
    });
    
    toast.success('Produit créé avec succès!');
    return res.data.data;
  } catch (error) {
    const errorMsg = error.response && error.response.data.error 
      ? error.response.data.error 
      : 'Erreur lors de la création du produit';
    
    toast.error(errorMsg);
    
    dispatch({
      type: PRODUCTS_ERROR,
      payload: errorMsg
    });
    
    throw error;
  }
};

// Action pour mettre à jour un produit
export const updateProduct = (productId, productData) => async (dispatch) => {
  dispatch({ type: PRODUCTS_LOADING });
  
  try {
    const res = await API.put(`/products/edit/${productId}`, productData);
    dispatch({
      type: UPDATE_PRODUCT,
      payload: res.data.data
    });
    
    toast.success(res.data.mesage|| "Produit mis à jour avec succès!");
    return res.data.data;
  } catch (error) {
    const errorMsg = error.response && error.response.data.error 
      ? error.response.data.error 
      : 'Erreur lors de la mise à jour du produit';
    
    toast.error(errorMsg);
    
    dispatch({
      type: PRODUCTS_ERROR,
      payload: errorMsg
    });
    
    throw error;
  }
};

// Action pour supprimer un produit
export const deleteProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCTS_LOADING });
  
  try {
    const res = await API.delete(`/products/delete/${productId}`);
    dispatch({
      type: DELETE_PRODUCT,
      payload: productId
    });
    
    toast.success(res.data.message || 'Produit supprimé avec succès!');
    return res.data.data;
  } catch (error) {
    const errorMsg = error.response && error.response.data.error 
      ? error.response.data.error 
      : 'Erreur lors de la suppression du produit';
    
    toast.error(errorMsg);
    
    dispatch({
      type: PRODUCTS_ERROR,
      payload: errorMsg
    });
    
    throw error;
  }
};
