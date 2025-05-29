import API from '../../api/api';
import { toast } from 'sonner';
import {
  GET_CUSTOMERS,
  GET_CUSTOMER,
  CUSTOMERS_LOADING,
  CUSTOMERS_ERROR
} from './types';

// Action pour récupérer tous les clients
export const getCustomers = (filters = {}) => async (dispatch) => {
  dispatch({ type: CUSTOMERS_LOADING });
  
  try {
    const params = new URLSearchParams();
    
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.minOrders) params.append('minOrders', filters.minOrders);
    if (filters.maxOrders) params.append('maxOrders', filters.maxOrders);
    if (filters.search) params.append('search', filters.search);
    if (filters.postalCode) params.append('postalCode', filters.postalCode);
    
    const queryString = params.toString();
    const url = `/customers/get_customers${queryString ? '?' + queryString : ''}`;
    
    const res = await API.get(url);
    dispatch({
      type: GET_CUSTOMERS,
      payload: res.data.data
    });
    return res.data.data;
  } catch (error) {
    const errorMsg = error.response && error.response.data.message 
      ? error.response.data.message 
      : 'Erreur lors de la récupération des clients';
    
    // toast.error(errorMsg);
    
    dispatch({
      type: CUSTOMERS_ERROR,
      payload: errorMsg
    });
    
    throw error;
  }
};

// Action pour récupérer un client par son ID
export const getCustomerById = (customerId) => async (dispatch) => {
  dispatch({ type: CUSTOMERS_LOADING });
  
  try {
    const res = await API.get(`/customers/get_customer/${customerId}`);
    dispatch({
      type: GET_CUSTOMER,
      payload: res.data.data
    });
    return res.data.data;
  } catch (error) {
    const errorMsg = error.response && error.response.data.message 
      ? error.response.data.message 
      : 'Erreur lors de la récupération du client';
    
    toast.error(errorMsg);
    
    dispatch({
      type: CUSTOMERS_ERROR,
      payload: errorMsg
    });
    
    throw error;
  }
};

// Action pour mettre à jour le profil du client
export const updateCustomer = (customerData) => async (dispatch) => {
  dispatch({ type: CUSTOMERS_LOADING });
  
  try {
    const res = await API.put('/customers/me', customerData);
    
    // Mettre à jour les informations utilisateur dans le localStorage
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    localStorage.setItem('user', JSON.stringify({ ...currentUser, ...res.data }));
    
    toast.success('Profil mis à jour avec succès!');
    return res.data.data;
  } catch (error) {
    const errorMsg = error.response && error.response.data.message 
      ? error.response.data.message 
      : 'Erreur lors de la mise à jour du profil';
    
    toast.error(errorMsg);
    
    dispatch({
      type: CUSTOMERS_ERROR,
      payload: errorMsg
    });
    
    throw error;
  }
};

// Action pour changer le mot de passe du client
export const changePassword = (passwordData) => async (dispatch) => {
  dispatch({ type: CUSTOMERS_LOADING });
  
  try {
    const res = await API.put('/customers/me/password', passwordData);
    toast.success('Mot de passe changé avec succès!');
    return res.data.data;
  } catch (error) {
    const errorMsg = error.response && error.response.data.message 
      ? error.response.data.message 
      : 'Erreur lors du changement de mot de passe';
    
    toast.error(errorMsg);
    
    dispatch({
      type: CUSTOMERS_ERROR,
      payload: errorMsg
    });
    
    throw error;
  }
};
