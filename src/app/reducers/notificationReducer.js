import { FETCH_NOTIFICATIONS_FAILURE, FETCH_NOTIFICATIONS_REQUEST, FETCH_NOTIFICATIONS_SUCCESS, FETCH_NOTIFICATIONS_SUCCESS_2, FETCH_NOTIFICATION_FAILURE, FETCH_NOTIFICATION_REQUEST, FETCH_NOTIFICATION_SUCCESS } from "../actions/actions";



// notificationReducer.js
const initialState = {
  notifications: [],
  notifications2: [],
  notification: {},
  notificationSelect: {},
  loadingNotification: false,
  loadingNotificationSelect: false,
  loadingNotifications: false,
  errorNotifications: null,
  errorNotification: null
  // ... autres états spécifiques à notificationReducer
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_NOTIFICATION_REQUEST:
      // Dispatch une action pour définir loading sur true dans le globalReducer
      return {
        ...state,
        loadingNotification: true,
        errorNotification: ""
        // Autres manipulations d'état pour la demande de récupération des notifications
      };

    case FETCH_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loadingNotification: false,
        errorNotification: "",
        notification: action.payload
      };

    case FETCH_NOTIFICATION_FAILURE:
      return {
        ...state,
        loadingNotification: false,
        errorNotification: action.payload
      };


    case FETCH_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        loadingNotifications: true,
        errorNotifications: ""
      };

    case FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.payload,
        loadingNotifications: false,
        errorNotifications: ""
        // Autres manipulations d'état pour le succès de la récupération des notifications
      };

    case FETCH_NOTIFICATIONS_SUCCESS_2:
      return {
        ...state,
        notifications2: action.payload,
        loadingNotifications: false,
        errorNotifications: ""
        // Autres manipulations d'état pour le succès de la récupération des notifications
      };

    case FETCH_NOTIFICATIONS_FAILURE:
      // Dispatch une action pour définir loading sur false dans le globalReducer et enregistrer l'erreur
      return {
        ...state,
        loadingNotifications: false,
        errorNotifications: action.payload
        // Autres manipulations d'état pour l'échec de la récupération des notifications
      };
    // ... autres cas pour d'autres actions liées aux notifications

    default:
      return state;
  }
};

export default notificationReducer;