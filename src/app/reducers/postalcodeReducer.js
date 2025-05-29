import { FETCH_POSTAL_CODES_FAILURE, FETCH_POSTAL_CODES_REQUEST, FETCH_POSTAL_CODES_SUCCESS, FETCH_POSTAL_CODES_SUCCESS_2, FETCH_POSTAL_CODE_FAILURE, FETCH_POSTAL_CODE_REQUEST, FETCH_POSTAL_CODE_SUCCESS } from "../actions/actions";


// postalcodeReducer.js
const initialState = {
  postalcodes: [],
  postalcodes2: [],
  postalcode: {},
  postalcodeSelect: {},
  loadingPostalcode: false,
  loadingPostalcodeSelect: false,
  loadingPostalcodes: false,
  errorPostalcodes: null,
  errorPostalcode: null
  // ... autres états spécifiques à postalcodeReducer
};

const postalcodeReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_POSTAL_CODE_REQUEST:
      // Dispatch une action pour définir loading sur true dans le globalReducer
      return {
        ...state,
        loadingPostalcode: true,
        errorPostalcode: ""
        // Autres manipulations d'état pour la demande de récupération des postalcodes
      };

    case FETCH_POSTAL_CODE_SUCCESS:
      return {
        ...state,
        loadingPostalcode: false,
        errorPostalcode: "",
        postalcode: action.payload
      };

    case FETCH_POSTAL_CODE_FAILURE:
      return {
        ...state,
        loadingPostalcode: false,
        errorPostalcode: action.payload
      };


    case FETCH_POSTAL_CODES_REQUEST:
      return {
        ...state,
        loadingPostalcodes: true,
        errorPostalcodes: ""
      };

    case FETCH_POSTAL_CODES_SUCCESS:
      return {
        ...state,
        postalcodes: action.payload,
        loadingPostalcodes: false,
        errorPostalcodes: ""
        // Autres manipulations d'état pour le succès de la récupération des postalcodes
      };

    case FETCH_POSTAL_CODES_SUCCESS_2:
      return {
        ...state,
        postalcodes2: action.payload,
        loadingPostalcodes: false,
        errorPostalcodes: ""
        // Autres manipulations d'état pour le succès de la récupération des postalcodes
      };

    case FETCH_POSTAL_CODES_FAILURE:
      // Dispatch une action pour définir loading sur false dans le globalReducer et enregistrer l'erreur
      return {
        ...state,
        loadingPostalcodes: false,
        errorPostalcodes: action.payload
        // Autres manipulations d'état pour l'échec de la récupération des postalcodes
      };
    // ... autres cas pour d'autres actions liées aux postalcodes

    default:
      return state;
  }
};

export default postalcodeReducer;