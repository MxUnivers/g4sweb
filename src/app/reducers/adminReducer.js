import { FETCH_ADMINS_FAILURE, FETCH_ADMINS_REQUEST, FETCH_ADMINS_SUCCESS, FETCH_ADMINS_SUCCESS_2, FETCH_ADMIN_FAILURE, FETCH_ADMIN_REQUEST, FETCH_ADMIN_SUCCESS } from "../actions/actions";



// adminReducer.js
const initialState = {
  admins: [],
  admins2: [],
  admin: {},
  adminSelect: {},
  loadingAdmin: false,
  loadingAdminSelect: false,
  loadingAdmins: false,
  errorAdmins: null,
  errorAdmin: null
  // ... autres états spécifiques à adminReducer
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_ADMIN_REQUEST:
      // Dispatch une action pour définir loading sur true dans le globalReducer
      return {
        ...state,
        loadingAdmin: true,
        errorAdmin: ""
        // Autres manipulations d'état pour la demande de récupération des admins
      };

    case FETCH_ADMIN_SUCCESS:
      return {
        ...state,
        loadingAdmin: false,
        errorAdmin: "",
        admin: action.payload
      };

    case FETCH_ADMIN_FAILURE:
      return {
        ...state,
        loadingAdmin: false,
        errorAdmin: action.payload
      };


    case FETCH_ADMINS_REQUEST:
      return {
        ...state,
        loadingAdmins: true,
        errorAdmins: ""
      };

    case FETCH_ADMINS_SUCCESS:
      return {
        ...state,
        admins: action.payload,
        loadingAdmins: false,
        errorAdmins: ""
        // Autres manipulations d'état pour le succès de la récupération des admins
      };

    case FETCH_ADMINS_SUCCESS_2:
      return {
        ...state,
        admins2: action.payload,
        loadingAdmins: false,
        errorAdmins: ""
        // Autres manipulations d'état pour le succès de la récupération des admins
      };

    case FETCH_ADMINS_FAILURE:
      // Dispatch une action pour définir loading sur false dans le globalReducer et enregistrer l'erreur
      return {
        ...state,
        loadingAdmins: false,
        errorAdmins: action.payload
        // Autres manipulations d'état pour l'échec de la récupération des admins
      };
    // ... autres cas pour d'autres actions liées aux admins

    default:
      return state;
  }
};

export default adminReducer;