import { FETCH_BASKET_PRODUCTS_FAILURE, FETCH_BASKET_PRODUCTS_REQUEST, FETCH_BASKET_PRODUCTS_SUCCESS, FETCH_BASKET_PRODUCTS_SUCCESS_2, FETCH_BASKET_PRODUCT_FAILURE, FETCH_BASKET_PRODUCT_REQUEST, FETCH_BASKET_PRODUCT_SUCCESS } from "../actions/actions";



// basketReducer.js
const initialState = {
  baskets: [],
  baskets2: [],
  basket: {},
  basketSelect: {},
  loadingBasket: false,
  loadingBasketSelect: false,
  loadingBaskets: false,
  errorBaskets: null,
  errorBasket: null
  // ... autres états spécifiques à basketReducer
};

const basketReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_BASKET_PRODUCT_REQUEST:
      // Dispatch une action pour définir loading sur true dans le globalReducer
      return {
        ...state,
        loadingBasket: true,
        errorBasket: ""
        // Autres manipulations d'état pour la demande de récupération des baskets
      };

    case FETCH_BASKET_PRODUCT_SUCCESS:
      return {
        ...state,
        loadingBasket: false,
        errorBasket: "",
        basket: action.payload
      };

    case FETCH_BASKET_PRODUCT_FAILURE:
      return {
        ...state,
        loadingBasket: false,
        errorBasket: action.payload
      };


    case FETCH_BASKET_PRODUCTS_REQUEST:
      return {
        ...state,
        loadingBaskets: true,
        errorBaskets: ""
      };

    case FETCH_BASKET_PRODUCTS_SUCCESS:
      return {
        ...state,
        baskets: action.payload,
        loadingBaskets: false,
        errorBaskets: ""
        // Autres manipulations d'état pour le succès de la récupération des baskets
      };

    case FETCH_BASKET_PRODUCTS_SUCCESS_2:
      return {
        ...state,
        baskets2: action.payload,
        loadingBaskets: false,
        errorBaskets: ""
        // Autres manipulations d'état pour le succès de la récupération des baskets
      };

    case FETCH_BASKET_PRODUCTS_FAILURE:
      // Dispatch une action pour définir loading sur false dans le globalReducer et enregistrer l'erreur
      return {
        ...state,
        loadingBaskets: false,
        errorBaskets: action.payload
        // Autres manipulations d'état pour l'échec de la récupération des baskets
      };
    // ... autres cas pour d'autres actions liées aux baskets

    default:
      return state;
  }
};

export default basketReducer;