import axios from 'axios';
import { baseurl } from '../config/baseurl';

// Configuration de base d'Axios
const API = axios.create({
  baseURL: baseurl.url, // Remplacez par votre URL de base
  // timeout: 10000
});

// Intercepteur pour ajouter le token JWT à chaque requête
API.interceptors.request.use(
  (config) => {
    const token = baseurl.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
