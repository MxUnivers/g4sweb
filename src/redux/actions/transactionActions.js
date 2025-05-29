import API from '../../api/api';
import { toast } from 'sonner';
import {
  GET_TRANSACTIONS,
  GET_TRANSACTION,
  UPDATE_TRANSACTION,
  TRANSACTIONS_LOADING,
  TRANSACTIONS_ERROR
} from './types';

// Action pour récupérer toutes les transactions
export const getTransactions = (filters = {}) => async (dispatch) => {
  dispatch({ type: TRANSACTIONS_LOADING });
  
  try {
    const params = new URLSearchParams();
    
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.minAmount) params.append('minAmount', filters.minAmount);
    if (filters.maxAmount) params.append('maxAmount', filters.maxAmount);
    if (filters.customerId) params.append('customerId', filters.customerId);
    if (filters.productId) params.append('productId', filters.productId);
    
    const queryString = params.toString();
    const url = `/transactions/ge_transactions${queryString ? '?' + queryString : ''}`;
    
    const res = await API.get(url);
    dispatch({
      type: GET_TRANSACTIONS,
      payload: res.data
    });
    return res.data;
  } catch (error) {
    const errorMsg = error.response && error.response.data.error 
      ? error.response.data.error 
      : 'Erreur lors de la récupération des transactions';
    
    toast.error(errorMsg);
    
    dispatch({
      type: TRANSACTIONS_ERROR,
      payload: errorMsg
    });
    
    throw error;
  }
};

// Action pour récupérer une transaction par son ID
export const getTransactionById = (transactionId) => async (dispatch) => {
  dispatch({ type: TRANSACTIONS_LOADING });
  
  try {
    const res = await API.get(`/transactions/ge_transaction/${transactionId}`);
    dispatch({
      type: GET_TRANSACTION,
      payload: res.data
    });
    return res.data;
  } catch (error) {
    const errorMsg = error.response && error.response.data.error 
      ? error.response.data.error 
      : 'Erreur lors de la récupération de la transaction';
    
    toast.error(errorMsg);
    
    dispatch({
      type: TRANSACTIONS_ERROR,
      payload: errorMsg
    });
    
    throw error;
  }
};

// Action pour mettre à jour le statut d'une transaction
export const updateTransactionStatus = (transactionId, status) => async (dispatch) => {
  dispatch({ type: TRANSACTIONS_LOADING });
  
  try {
    const res = await API.put(`/transactions/${transactionId}/status`, { status });
    dispatch({
      type: UPDATE_TRANSACTION,
      payload: res.data
    });
    
    toast.success('Statut de la transaction mis à jour!');
    return res.data;
  } catch (error) {
    const errorMsg = error.response && error.response.data.error 
      ? error.response.data.error 
      : 'Erreur lors de la mise à jour du statut';
    
    toast.error(errorMsg);
    
    dispatch({
      type: TRANSACTIONS_ERROR,
      payload: errorMsg
    });
    
    throw error;
  }
};
