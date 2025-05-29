import { FETCH_CUSTOMERS_FAILURE, FETCH_CUSTOMERS_REQUEST, FETCH_CUSTOMERS_SUCCESS, FETCH_CUSTOMERS_SUCCESS_2, FETCH_CUSTOMER_FAILURE, FETCH_CUSTOMER_REQUEST, FETCH_CUSTOMER_SUCCESS } from "../actions/actions";



// customerReducer.js
const initialState = {
  customers: [],
  customers2: [],
  customer: {},
  customerSelect: {},
  loadingCustomer: false,
  loadingCustomerSelect: false,
  loadingCustomers: false,
  errorCustomers: null,
  errorCustomer: null
  // ... autres états spécifiques à customerReducer
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_CUSTOMER_REQUEST:
      // Dispatch une action pour définir loading sur true dans le globalReducer
      return {
        ...state,
        loadingCustomer: true,
        errorCustomer: ""
        // Autres manipulations d'état pour la demande de récupération des customers
      };

    case FETCH_CUSTOMER_SUCCESS:
      return {
        ...state,
        loadingCustomer: false,
        errorCustomer: "",
        customer: action.payload
      };

    case FETCH_CUSTOMER_FAILURE:
      return {
        ...state,
        loadingCustomer: false,
        errorCustomer: action.payload
      };


    case FETCH_CUSTOMERS_REQUEST:
      return {
        ...state,
        loadingCustomers: true,
        errorCustomers: ""
      };

    case FETCH_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: action.payload,
        loadingCustomers: false,
        errorCustomers: ""
        // Autres manipulations d'état pour le succès de la récupération des customers
      };

    case FETCH_CUSTOMERS_SUCCESS_2:
      return {
        ...state,
        customers2: action.payload,
        loadingCustomers: false,
        errorCustomers: ""
        // Autres manipulations d'état pour le succès de la récupération des customers
      };

    case FETCH_CUSTOMERS_FAILURE:
      // Dispatch une action pour définir loading sur false dans le globalReducer et enregistrer l'erreur
      return {
        ...state,
        loadingCustomers: false,
        errorCustomers: action.payload
        // Autres manipulations d'état pour l'échec de la récupération des customers
      };
    // ... autres cas pour d'autres actions liées aux customers

    default:
      return state;
  }
};

export default customerReducer;