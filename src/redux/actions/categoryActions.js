import API from '../../api/api';
import { toast } from 'sonner';
import {
  GET_CATEGORIES,
  GET_CATEGORY,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  CATEGORIES_LOADING,
  CATEGORIES_ERROR
} from './types';

// Action pour récupérer toutes les catégories
export const getCategories = () => async (dispatch) => {
  dispatch({ type: CATEGORIES_LOADING });
  
  try {
    const res = await API.get('/categorys/get_categorys');
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data.data
    });
    return res.data.data;
  } catch (error) {
    const errorMsg = error.response && error.response.data.message
      ? error.response.data.message 
      : 'Erreur lors de la récupération des catégories';
    
    // toast.error(errorMsg);
    
    dispatch({
      type: CATEGORIES_ERROR,
      payload: errorMsg
    });
    
    throw error;
  }
};

// Action pour récupérer une catégorie par son ID
export const getCategoryById = (categoryId) => async (dispatch) => {
  dispatch({ type: CATEGORIES_LOADING });
  
  try {
    const res = await API.get(`/categorys/get_category/${categoryId}`);
    dispatch({
      type: GET_CATEGORY,
      payload: res.data.data
    });
    return res.data.data;
  } catch (error) {
    const errorMsg = error.response && error.response.data.message 
      ? error.response.data.message 
      : 'Erreur lors de la récupération de la catégorie';
    
    toast.error(errorMsg);
    
    dispatch({
      type: CATEGORIES_ERROR,
      payload: errorMsg
    });
    
    throw error;
  }
};

// Action pour créer une nouvelle catégorie
export const createCategory = (categoryData) => async (dispatch) => {
  dispatch({ type: CATEGORIES_LOADING });
  
  try {
    const res = await API.post('/categorys/create', categoryData);
    dispatch({
      type: ADD_CATEGORY,
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
      type: CATEGORIES_ERROR,
      payload: errorMsg
    });
    
    throw error;
  }
};

// Action pour mettre à jour une catégorie
export const updateCategory = (categoryId, categoryData) => async (dispatch) => {
  dispatch({ type: CATEGORIES_LOADING });
  
  try {
    const res = await API.put(`/categorys/edit/${categoryId}`, categoryData);
    dispatch({
      type: UPDATE_CATEGORY,
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
      type: CATEGORIES_ERROR,
      payload: errorMsg
    });
    
    throw error;
  }
};

// Action pour supprimer une catégorie
export const deleteCategory = (categoryId) => async (dispatch) => {
  dispatch({ type: CATEGORIES_LOADING });
  
  try {
    const res = await API.delete(`/categorys/delete/${categoryId}`);
    dispatch({
      type: DELETE_CATEGORY,
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
      type: CATEGORIES_ERROR,
      payload: errorMsg
    });
    
    throw error;
  }
};