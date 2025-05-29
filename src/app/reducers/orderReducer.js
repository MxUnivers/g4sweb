import { FETCH_ORDER_PRODUCTS_FAILURE, FETCH_ORDER_PRODUCTS_REQUEST, FETCH_ORDER_PRODUCTS_SUCCESS, FETCH_ORDER_PRODUCTS_SUCCESS_2, FETCH_ORDER_PRODUCT_FAILURE, FETCH_ORDER_PRODUCT_REQUEST, FETCH_ORDER_PRODUCT_SUCCESS } from "../actions/actions";



// orderReducer.js
const initialState = {
  orders: [],
  orders2: [],
  order: {},
  orderSelect: {},
  loadingOrder: false,
  loadingOrderSelect: false,
  loadingOrders: false,
  errorOrders: null,
  errorOrder: null
  // ... autres états spécifiques à orderReducer
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_ORDER_PRODUCT_REQUEST:
      // Dispatch une action pour définir loading sur true dans le globalReducer
      return {
        ...state,
        loadingOrder: true,
        errorOrder: ""
        // Autres manipulations d'état pour la demande de récupération des orders
      };

    case FETCH_ORDER_PRODUCT_SUCCESS:
      return {
        ...state,
        loadingOrder: false,
        errorOrder: "",
        order: action.payload
      };

    case FETCH_ORDER_PRODUCT_FAILURE:
      return {
        ...state,
        loadingOrder: false,
        errorOrder: action.payload
      };


    case FETCH_ORDER_PRODUCTS_REQUEST:
      return {
        ...state,
        loadingOrders: true,
        errorOrders: ""
      };

    case FETCH_ORDER_PRODUCTS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loadingOrders: false,
        errorOrders: ""
        // Autres manipulations d'état pour le succès de la récupération des orders
      };

    case FETCH_ORDER_PRODUCTS_SUCCESS_2:
      return {
        ...state,
        orders2: action.payload,
        loadingOrders: false,
        errorOrders: ""
        // Autres manipulations d'état pour le succès de la récupération des orders
      };

    case FETCH_ORDER_PRODUCTS_FAILURE:
      // Dispatch une action pour définir loading sur false dans le globalReducer et enregistrer l'erreur
      return {
        ...state,
        loadingOrders: false,
        errorOrders: action.payload
        // Autres manipulations d'état pour l'échec de la récupération des orders
      };
    // ... autres cas pour d'autres actions liées aux orders

    default:
      return state;
  }
};

export default orderReducer;