import axios from "axios";
import { FETCH_TRANSACTION_SUCCESS, FETCH_TRANSACTIONS_FAILURE, FETCH_TRANSACTIONS_REQUEST, FETCH_TRANSACTIONS_SUCCESS, FETCH_TRANSACTIONS_SUCCESS_2, FETCH_TRANSACTION_FAILURE, FETCH_TRANSACTION_REQUEST } from "../../app/actions/actions";
import { ROUTES } from "../../config/routing";
import { dureeDeVie, getAndCheckLocalStorage, setWithExpiration } from "../../config/localvalueFunction";
import {  localStorageKeys } from "../../config/localvalue";
import { baseurl } from "../../config/baseurl";
import { saveDataToFile } from "../local/DataLocal";







// All users of plateforme
export function fetchTransactionsAll(
    startDate,
    endDate,
    minAmount,
    maxAmount,
    customerId,
    productId) {
    return async (dispatch) => {
        dispatch({ type: FETCH_TRANSACTIONS_REQUEST });
        const params = new URLSearchParams();
        // Préparer les paramètres de requête
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);
        if (minAmount) params.append("minAmount", minAmount);
        if (maxAmount) params.append("maxAmount", maxAmount);
        if (customerId) params.append("customerId", customerId);
        if (productId) params.append("productId", productId);

        await axios.get(`${baseurl.url}/api/v1/transactions/get_transactions?${params.toString()}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_TRANSACTIONS_SUCCESS, payload: response.data.data });
            dispatch({ type: FETCH_TRANSACTIONS_SUCCESS_2, payload: response.data.data });
            saveDataToFile(response.data.data, localStorageKeys.transactionsData);
        })
            .catch((error) => {
                //console.log(error);
                dispatch({ type: FETCH_TRANSACTIONS_FAILURE, payload:  error?.response?.data?.message });
            });
    }
}











export function fetchTransactionById(idTransaction) {
    return async (dispatch) => {
        dispatch({ type: FETCH_TRANSACTION_REQUEST });
        await axios.get(`${baseurl.url}/api/v1/transactions/get_transaction/${idTransaction}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_TRANSACTION_SUCCESS, payload: response.data.data });
            dispatch({ type: FETCH_TRANSACTION_SUCCESS, payload: {} });
        })
            .catch((error) => {
                dispatch({ type: FETCH_TRANSACTION_FAILURE, payload: error?.response?.data?.message })
                //console.log(error);
            });
    }
}






