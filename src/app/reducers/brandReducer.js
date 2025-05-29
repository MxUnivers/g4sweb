import { FETCH_BRAND_PRODUCTS_FAILURE, FETCH_BRAND_PRODUCTS_REQUEST, FETCH_BRAND_PRODUCTS_SUCCESS, FETCH_BRAND_PRODUCTS_SUCCESS_2, FETCH_BRAND_PRODUCT_FAILURE, FETCH_BRAND_PRODUCT_REQUEST, FETCH_BRAND_PRODUCT_SUCCESS } from "../actions/actions";



// brandReducer.js
const initialState = {
  brands: [],
  brands2: [],
  brand: {},
  brandSelect: {},
  loadingBrand: false,
  loadingBrandSelect: false,
  loadingBrands: false,
  errorBrands: null,
  errorBrand: null
  // ... autres états spécifiques à brandReducer
};

const brandReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_BRAND_PRODUCT_REQUEST:
      // Dispatch une action pour définir loading sur true dans le globalReducer
      return {
        ...state,
        loadingBrand: true,
        errorBrand: ""
        // Autres manipulations d'état pour la demande de récupération des brands
      };

    case FETCH_BRAND_PRODUCT_SUCCESS:
      return {
        ...state,
        loadingBrand: false,
        errorBrand: "",
        brand: action.payload
      };

    case FETCH_BRAND_PRODUCT_FAILURE:
      return {
        ...state,
        loadingBrand: false,
        errorBrand: action.payload
      };


    case FETCH_BRAND_PRODUCTS_REQUEST:
      return {
        ...state,
        loadingBrands: true,
        errorBrands: ""
      };

    case FETCH_BRAND_PRODUCTS_SUCCESS:
      return {
        ...state,
        brands: action.payload,
        loadingBrands: false,
        errorBrands: ""
        // Autres manipulations d'état pour le succès de la récupération des brands
      };

    case FETCH_BRAND_PRODUCTS_SUCCESS_2:
      return {
        ...state,
        brands2: action.payload,
        loadingBrands: false,
        errorBrands: ""
        // Autres manipulations d'état pour le succès de la récupération des brands
      };

    case FETCH_BRAND_PRODUCTS_FAILURE:
      // Dispatch une action pour définir loading sur false dans le globalReducer et enregistrer l'erreur
      return {
        ...state,
        loadingBrands: false,
        errorBrands: action.payload
        // Autres manipulations d'état pour l'échec de la récupération des brands
      };
    // ... autres cas pour d'autres actions liées aux brands

    default:
      return state;
  }
};

export default brandReducer;