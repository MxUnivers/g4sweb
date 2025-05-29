// actions/contactActions.js
import API from '../../api/api';
import { toast } from 'sonner';
import {
  GET_CONTACTS,
  GET_CONTACT,
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  CONTACTS_LOADING,
  CONTACTS_ERROR,
} from './types';

// Action pour récupérer tous les contacts avec filtres
export const getContacts = (filters = {}) => async (dispatch) => {
  dispatch({ type: CONTACTS_LOADING });

  try {
    // Construction des query params pour les filtres
    const params = new URLSearchParams();
    if (filters.email) params.append('email', filters.email);
    if (filters.phone) params.append('phone', filters.phone);
    if (filters.postalCode) params.append('postalCode', filters.postalCode);
    if (filters.category) params.append('category', filters.category);

    const queryString = params.toString();
    const url = `/contacts/messages${queryString ? '?' + queryString : ''}`;

    const res = await API.get(url);
    dispatch({
      type: GET_CONTACTS,
      payload: res.data.data,
    });
    return res.data.data;
  } catch (error) {
    const errorMsg =
      error.response && error.response.data.message
        ? error.response.data.error
        : 'Erreur lors de la récupération des contacts';

    toast.error(errorMsg);

    dispatch({
      type: CONTACTS_ERROR,
      payload: errorMsg,
    });

    throw error;
  }
};

// Action pour récupérer un contact par son ID
export const getContactById = (contactId) => async (dispatch) => {
  dispatch({ type: CONTACTS_LOADING });

  try {
    const res = await API.get(`/contacts/messages/${contactId}`);
    dispatch({
      type: GET_CONTACT,
      payload: res.data.data,
    });
  } catch (error) {
    const errorMsg =
      error.response?.data?.message || 'Erreur lors de la récupération du contact';

    dispatch({
      type: CONTACTS_ERROR,
      payload: errorMsg,
    });

    throw error;
  }
};

// Action pour créer un nouveau contact
export const createContact = (contactData) => async (dispatch) => {
  dispatch({ type: CONTACTS_LOADING });

  try {
    const res = await API.post('/contacts/send', contactData);
    dispatch({
      type: ADD_CONTACT,
      payload: res.data.data,
    });

    toast.success('Message envoyé avec succès!');
    return res.data.data;
  } catch (error) {
    const errorMsg =
      error.response && error.response.data.error
        ? error.response.data.error
        : 'Erreur lors de l\'envoi du message';

    toast.error(errorMsg);

    dispatch({
      type: CONTACTS_ERROR,
      payload: errorMsg,
    });

    throw error;
  }
};

// Action pour répondre à un message de contact
export const replyToContact = (contactId, response) => async (dispatch) => {
  dispatch({ type: CONTACTS_LOADING });

  try {
    const res = await API.post(`/contacts/reply/${contactId}`, { response });
    dispatch({
      type: UPDATE_CONTACT,
      payload: res.data.data,
    });

    toast.success('Réponse ajoutée avec succès!');
    return res.data.data;
  } catch (error) {
    const errorMsg =
      error.response && error.response.data.error
        ? error.response.data.error
        : 'Erreur lors de l\'ajout de la réponse';

    toast.error(errorMsg);

    dispatch({
      type: CONTACTS_ERROR,
      payload: errorMsg,
    });

    throw error;
  }
};

// Action pour supprimer un contact
export const deleteContact = (contactId) => async (dispatch) => {
  dispatch({ type: CONTACTS_LOADING });

  try {
    const res = await API.delete(`/contacts/delete/${contactId}`);
    dispatch({
      type: DELETE_CONTACT,
      payload: contactId,
    });

    toast.success(res.data.message || 'Message supprimé avec succès!');
    return res.data.data;
  } catch (error) {
    const errorMsg =
      error.response && error.response.data.error
        ? error.response.data.error
        : 'Erreur lors de la suppression du message';

    toast.error(errorMsg);

    dispatch({
      type: CONTACTS_ERROR,
      payload: errorMsg,
    });

    throw error;
  }
};