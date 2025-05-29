import {
  GET_CONTACTS,
  GET_CONTACT,
  UPDATE_CONTACT,
  CONTACTS_LOADING,
  CONTACTS_ERROR
} from '../actions/types';

const initialState = {
  contacts: [],
  currentContact: null,
  loading: false,
  error: null
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTACTS_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
        error: null
      };
    
    case GET_CONTACT:
      return {
        ...state,
        currentContact: action.payload,
        loading: false,
        error: null
      };
    
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact => 
          contact._id === action.payload._id ? action.payload : contact
        ),
        currentContact: state.currentContact && state.currentContact._id === action.payload._id 
          ? action.payload 
          : state.currentContact,
        loading: false,
        error: null
      };
    
    case CONTACTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    default:
      return state;
  }
};

export default contactReducer;
