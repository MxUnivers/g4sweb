// authAdminActions.js
import API from '../../api/api';
import { toast } from 'sonner';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_LOADING,
  AUTH_ERROR,
} from './types';

// Action pour la connexion de l'admin
export const loginAdmin = (credentials) => async (dispatch) => {
  if (!credentials.email || !credentials.password) {
    toast.error('Veuillez remplir tous les champs obligatoires.');
    return;
  }

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
        isAdmin: true,
      },
    });

    toast.success('Connexion réussie!');
    return res.data;
  } catch (error) {
    const errorMsg =
      error.response && error.response.data.error
        ? error.response.data.error
        : 'Erreur de connexion';

    toast.error(errorMsg);

    dispatch({
      type: LOGIN_FAIL,
      payload: errorMsg,
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