import API from '../../api/api';
import { toast } from 'sonner';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_LOADING,
  AUTH_ERROR
} from './types';

// Action pour la connexion de l'admin
export const loginAdmin = (credentials) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });
  
  try {
    const res = await API.post('/admin/login', credentials);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.admin));
    
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token: res.data.token,
        user: res.data.admin,
        isAdmin: true
      }
    });
    
    toast.success('Connexion réussie!');
    return res.data;
  } catch (error) {
    const errorMsg = error.response && error.response.data.error 
      ? error.response.data.error 
      : 'Erreur de connexion';
    
    toast.error(errorMsg);
    
    dispatch({
      type: LOGIN_FAIL,
      payload: errorMsg
    });
    
    throw error;
  }
};

// Action pour la connexion d'un client
export const loginCustomer = (credentials) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });
  
  try {
    const res = await API.post('/customer/login', credentials);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.customer));
    
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token: res.data.token,
        user: res.data.customer,
        isAdmin: false
      }
    });
    
    toast.success('Connexion réussie!');
    return res.data;
  } catch (error) {
    const errorMsg = error.response && error.response.data.error 
      ? error.response.data.error 
      : 'Erreur de connexion';
    
    toast.error(errorMsg);
    
    dispatch({
      type: LOGIN_FAIL,
      payload: errorMsg
    });
    
    throw error;
  }
};

// Action pour l'inscription d'un client
export const registerCustomer = (userData) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });
  
  try {
    const res = await API.post('/customer/create', userData);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.customer));
    
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token: res.data.token,
        user: res.data.customer,
        isAdmin: false
      }
    });
    
    toast.success('Inscription réussie!');
    return res.data;
  } catch (error) {
    const errorMsg = error.response && error.response.data.error 
      ? error.response.data.error 
      : 'Erreur lors de l\'inscription';
    
    toast.error(errorMsg);
    
    dispatch({
      type: AUTH_ERROR,
      payload: errorMsg
    });
    
    throw error;
  }
};

// Action pour la déconnexion
export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
  dispatch({ type: LOGOUT });
  toast.info('Vous êtes déconnecté');
};
