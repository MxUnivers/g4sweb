import API from '../../api/api';
import { toast } from 'sonner';
import {
  GET_POSTALCODES,
  GET_POSTALCODE,
  ADD_POSTALCODE,
  UPDATE_POSTALCODE,
  DELETE_POSTALCODE,
  POSTALCODES_LOADING,
  POSTALCODES_ERROR
} from './types';

// Action pour récupérer toutes les catégories
export const getPostalcodes = () => async (dispatch) => {
  dispatch({ type: POSTALCODES_LOADING });
  
  try {
    const res = await API.get('/postal-codes/get_postal-codes');
    dispatch({
      type: GET_POSTALCODES,
      payload: res.data.data
    });
    return res.data.data;
  } catch (error) {
    const errorMsg = error.response && error.response.data.message
      ? error.response.data.message 
      : 'Erreur lors de la récupération des catégories';
    
    // toast.error(errorMsg);
    
    dispatch({
      type: POSTALCODES_ERROR,
      payload: errorMsg
    });
    
    throw error;
  }
};

// Action pour récupérer une catégorie par son ID
export const getPostalcodeById = (categoryId) => async (dispatch) => {
  dispatch({ type: POSTALCODES_LOADING });
  
  try {
    const res = await API.get(`/postal-codes/get_postal-code/${categoryId}`);
    dispatch({
      type: GET_POSTALCODES,
      payload: res.data.data
    });
    return res.data.data;
  } catch (error) {
    const errorMsg = error.response && error.response.data.message 
      ? error.response.data.message 
      : 'Erreur lors de la récupération de la catégorie';
    
    // toast.error(errorMsg);
    
    dispatch({
      type: POSTALCODES_ERROR,
      payload: errorMsg
    });
    
    throw error;
  }
};

// Action pour créer une nouvelle catégorie
export const createPostalcode = (categoryData) => async (dispatch) => {
  dispatch({ type: POSTALCODES_LOADING });
  
  try {
    const res = await API.post('/postal-codes/create', categoryData);
    dispatch({
      type: ADD_POSTALCODE,
      payload: res.data.data
    });
    
    toast.success('Catégorie créée avec succès!');
    return res.data.data;
  } catch (error) {
    const errorMsg = error.response && error.response.data.message 
      ? error.response.data.message 
      : 'Erreur lors de la création de la catégorie';
    
    toast.error(errorMsg);
    
    dispatch({
      type: POSTALCODES_ERROR,
      payload: errorMsg
    });
    
    throw error;
  }
};

// Action pour mettre à jour une catégorie
export const updatePostalcode = (categoryId, categoryData) => async (dispatch) => {
  dispatch({ type: POSTALCODES_LOADING });
  
  try {
    const res = await API.put(`/postal-codes/edit/${categoryId}`, categoryData);
    dispatch({
      type: UPDATE_POSTALCODE,
      payload: res.data.data
    });
    
    toast.success('Catégorie mise à jour avec succès!');
    return res.data.data;
  } catch (error) {
    const errorMsg = error.response && error.response.data.message 
      ? error.response.data.message 
      : 'Erreur lors de la mise à jour de la catégorie';
    
    toast.error(errorMsg);
    
    dispatch({
      type: POSTALCODES_ERROR,
      payload: errorMsg
    });
    
    throw error;
  }
};

// Action pour supprimer une catégorie
export const deletePostalcode = (categoryId) => async (dispatch) => {
  dispatch({ type: POSTALCODES_LOADING });
  
  try {
    const res = await API.delete(`/postal-codes/delete/${categoryId}`);
    dispatch({
      type: DELETE_POSTALCODE,
      payload: categoryId
    });
    
    toast.success(res.data.message || 'Catégorie supprimée avec succès!');
    return res.data.data;
  } catch (error) {
    const errorMsg = error.response && error.response.data.message 
      ? error.response.data.message 
      : 'Erreur lors de la suppression de la catégorie';
    
    toast.error(errorMsg);
    
    dispatch({
      type: POSTALCODES_ERROR,
      payload: errorMsg
    });
    
    throw error;
  }
};