import { FETCH_CATEGORY_PRODUCTS_FAILURE, FETCH_CATEGORY_PRODUCTS_REQUEST, FETCH_CATEGORY_PRODUCTS_SUCCESS, FETCH_CATEGORY_PRODUCTS_SUCCESS_2, FETCH_CATEGORY_PRODUCT_FAILURE, FETCH_CATEGORY_PRODUCT_REQUEST, FETCH_CATEGORY_PRODUCT_SUCCESS } from "../actions/actions";



// categoryReducer.js
const initialState = {
  categorys: [],
  categorys2: [],
  category: {},
  categorySelect: {},
  loadingCategory: false,
  loadingCategorySelect: false,
  loadingCategorys: false,
  errorCategorys: null,
  errorCategory: null
  // ... autres états spécifiques à categoryReducer
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_CATEGORY_PRODUCT_REQUEST:
      // Dispatch une action pour définir loading sur true dans le globalReducer
      return {
        ...state,
        loadingCategory: true,
        errorCategory: ""
        // Autres manipulations d'état pour la demande de récupération des categorys
      };

    case FETCH_CATEGORY_PRODUCT_SUCCESS:
      return {
        ...state,
        loadingCategory: false,
        errorCategory: "",
        category: action.payload
      };

    case FETCH_CATEGORY_PRODUCT_FAILURE:
      return {
        ...state,
        loadingCategory: false,
        errorCategory: action.payload
      };


    case FETCH_CATEGORY_PRODUCTS_REQUEST:
      return {
        ...state,
        loadingCategorys: true,
        errorCategorys: ""
      };

    case FETCH_CATEGORY_PRODUCTS_SUCCESS:
      return {
        ...state,
        categorys: action.payload,
        loadingCategorys: false,
        errorCategorys: ""
        // Autres manipulations d'état pour le succès de la récupération des categorys
      };

    case FETCH_CATEGORY_PRODUCTS_SUCCESS_2:
      return {
        ...state,
        categorys2: action.payload,
        loadingCategorys: false,
        errorCategorys: ""
        // Autres manipulations d'état pour le succès de la récupération des categorys
      };

    case FETCH_CATEGORY_PRODUCTS_FAILURE:
      // Dispatch une action pour définir loading sur false dans le globalReducer et enregistrer l'erreur
      return {
        ...state,
        loadingCategorys: false,
        errorCategorys: action.payload
        // Autres manipulations d'état pour l'échec de la récupération des categorys
      };
    // ... autres cas pour d'autres actions liées aux categorys

    default:
      return state;
  }
};

export default categoryReducer;