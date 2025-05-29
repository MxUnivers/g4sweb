import { FETCH_TRANSACTIONS_FAILURE, FETCH_TRANSACTIONS_REQUEST, FETCH_TRANSACTIONS_SUCCESS, FETCH_TRANSACTIONS_SUCCESS_2, FETCH_TRANSACTION_FAILURE, FETCH_TRANSACTION_REQUEST, FETCH_TRANSACTION_SUCCESS } from "../actions/actions";



// transactionReducer.js
const initialState = {
  transactions: [],
  transactions2: [],
  transaction: {},
  transactionSelect: {},
  loadingTransaction: false,
  loadingTransactionSelect: false,
  loadingTransactions: false,
  errorTransactions: null,
  errorTransaction: null
  // ... autres états spécifiques à transactionReducer
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_TRANSACTION_REQUEST:
      // Dispatch une action pour définir loading sur true dans le globalReducer
      return {
        ...state,
        loadingTransaction: true,
        errorTransaction: ""
        // Autres manipulations d'état pour la demande de récupération des transactions
      };

    case FETCH_TRANSACTION_SUCCESS:
      return {
        ...state,
        loadingTransaction: false,
        errorTransaction: "",
        transaction: action.payload
      };

    case FETCH_TRANSACTION_FAILURE:
      return {
        ...state,
        loadingTransaction: false,
        errorTransaction: action.payload
      };


    case FETCH_TRANSACTIONS_REQUEST:
      return {
        ...state,
        loadingTransactions: true,
        errorTransactions: ""
      };

    case FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: action.payload,
        loadingTransactions: false,
        errorTransactions: ""
        // Autres manipulations d'état pour le succès de la récupération des transactions
      };

    case FETCH_TRANSACTIONS_SUCCESS_2:
      return {
        ...state,
        transactions2: action.payload,
        loadingTransactions: false,
        errorTransactions: ""
        // Autres manipulations d'état pour le succès de la récupération des transactions
      };

    case FETCH_TRANSACTIONS_FAILURE:
      // Dispatch une action pour définir loading sur false dans le globalReducer et enregistrer l'erreur
      return {
        ...state,
        loadingTransactions: false,
        errorTransactions: action.payload
        // Autres manipulations d'état pour l'échec de la récupération des transactions
      };
    // ... autres cas pour d'autres actions liées aux transactions

    default:
      return state;
  }
};

export default transactionReducer;