import axios from "axios";
import { FETCH_TRANSACTION_SUCCESS, FETCH_TRANSACTIONS_FAILURE, FETCH_TRANSACTIONS_REQUEST, FETCH_TRANSACTIONS_SUCCESS, FETCH_TRANSACTIONS_SUCCESS_2, FETCH_TRANSACTION_FAILURE, FETCH_TRANSACTION_REQUEST } from "../../app/actions/actions";
import { ROUTES } from "../../config/routing";
import { dureeDeVie, getAndCheckLocalStorage, setWithExpiration } from "../../config/localvalueFunction";
import {  localStorageKeys } from "../../config/localvalue";
import { baseurl } from "../../config/baseurl";
import { saveDataToFile } from "../local/DataLocal";







// All users of plateforme
export function fetchNotificationsAll(
    startDate,
      endDate,
      referenceType,
      type,
      recipientType,
      isRead,
      clientId,
      productId,
      categoryId,
      orderId,
      transactionId,
      adminId
    ) {
    return async (dispatch) => {
        dispatch({ type: FETCH_TRANSACTIONS_REQUEST });
        const params = new URLSearchParams();
        // Préparer les paramètres de requête
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);
        if (referenceType) params.append("referenceType", referenceType);
        if (recipientType) params.append("recipientType", recipientType);
        if (type) params.append("type", type);
        if (isRead) params.append("isRead", isRead);
        if (clientId) params.append("clientId", clientId);
        if (categoryId) params.append("categoryId", categoryId);
        if (orderId) params.append("orderId", orderId);
        if (transactionId) params.append("transactionId", transactionId);
        if (adminId) params.append("adminId", adminId);
        if (productId) params.append("productId", productId);

        await axios.get(`${baseurl.url}/api/v1/notifications/get_notifications?${params.toString()}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_TRANSACTIONS_SUCCESS, payload: response.data.data });
            dispatch({ type: FETCH_TRANSACTIONS_SUCCESS_2, payload: response.data.data });
            saveDataToFile(response.data.data, localStorageKeys.notificationsData);
        })
            .catch((error) => {
                //console.log(error);
                dispatch({ type: FETCH_TRANSACTIONS_FAILURE, payload: error.message });
            });
    }
}











export function fetchNotificationById(idNotification) {
    return async (dispatch) => {
        dispatch({ type: FETCH_TRANSACTION_REQUEST });
        await axios.get(`${baseurl.url}/api/v1/notifications/get_notification/${idNotification}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_TRANSACTION_SUCCESS, payload: response?.data?.data });
            dispatch({ type: FETCH_TRANSACTION_SUCCESS, payload: {} });
        })
            .catch((error) => {
                dispatch({ type: FETCH_TRANSACTION_FAILURE, payload: error.response?.data?.message })
                //console.log(error);
            });
    }
}







export function NotificationMarkedAsReadById(idNotification) {
    return async (dispatch) => {
        dispatch({ type: FETCH_TRANSACTION_REQUEST });
        await axios.get(`${baseurl.url}/api/v1/notifications/marke/${idNotification}/read`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_TRANSACTION_SUCCESS, payload: response.data.data });
        })
            .catch((error) => {
                dispatch({ type: FETCH_TRANSACTION_FAILURE, payload: error.message })
                //console.log(error);
            });
    }
}






