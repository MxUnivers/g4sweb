import { FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_SUCCESS_2, FETCH_PRODUCT_FAILURE, FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS } from "../actions/actions";



// productReducer.js
const initialState = {
  products: [],
  products2: [],
  product: {},
  productSelect: {},
  loadingProduct: false,
  loadingProductSelect: false,
  loadingProducts: false,
  errorProducts: null,
  errorProduct: null
  // ... autres états spécifiques à productReducer
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_PRODUCT_REQUEST:
      // Dispatch une action pour définir loading sur true dans le globalReducer
      return {
        ...state,
        loadingProduct: true,
        errorProduct: ""
        // Autres manipulations d'état pour la demande de récupération des products
      };

    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        loadingProduct: false,
        errorProduct: "",
        product: action.payload
      };

    case FETCH_PRODUCT_FAILURE:
      return {
        ...state,
        loadingProduct: false,
        errorProduct: action.payload
      };


    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loadingProducts: true,
        errorProducts: ""
      };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loadingProducts: false,
        errorProducts: ""
        // Autres manipulations d'état pour le succès de la récupération des products
      };

    case FETCH_PRODUCTS_SUCCESS_2:
      return {
        ...state,
        products2: action.payload,
        loadingProducts: false,
        errorProducts: ""
        // Autres manipulations d'état pour le succès de la récupération des products
      };

    case FETCH_PRODUCTS_FAILURE:
      // Dispatch une action pour définir loading sur false dans le globalReducer et enregistrer l'erreur
      return {
        ...state,
        loadingProducts: false,
        errorProducts: action.payload
        // Autres manipulations d'état pour l'échec de la récupération des products
      };
    // ... autres cas pour d'autres actions liées aux products

    default:
      return state;
  }
};

export default productReducer;