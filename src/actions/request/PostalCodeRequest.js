import axios from "axios";
import { FETCH_POSTAL_CODE_SUCCESS, FETCH_POSTAL_CODES_FAILURE, FETCH_POSTAL_CODES_REQUEST, FETCH_POSTAL_CODES_SUCCESS, FETCH_POSTAL_CODES_SUCCESS_2, FETCH_POSTAL_CODE_FAILURE, FETCH_POSTAL_CODE_REQUEST } from "../../app/actions/actions";
import { ROUTES } from "../../config/routing";
import { dureeDeVie, getAndCheckLocalStorage, setWithExpiration } from "../../config/localvalueFunction";
import {  localStorageKeys } from "../../config/localvalue";
import { baseurl } from "../../config/baseurl";
import { saveDataToFile } from "../local/DataLocal";
import { toast } from "react-toastify";



// All users of plateforme
export function fetchPostalCodesAll() {
    return async (dispatch) => {
        dispatch({ type: FETCH_POSTAL_CODES_REQUEST });
        const params = new URLSearchParams();

        await axios.get(`${baseurl.url}/api/v1/postal-codes/get_postal-codes?${params.toString()}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_POSTAL_CODES_SUCCESS, payload: response.data.data });
            dispatch({ type: FETCH_POSTAL_CODES_SUCCESS_2, payload: response.data.data });
            saveDataToFile(response.data.data, localStorageKeys.postalCodesData);
        })
            .catch((error) => {
                //console.log(error);
                dispatch({ type: FETCH_POSTAL_CODES_FAILURE, payload: error.message });
            });
    }
}











export function fetchPostalCodeById(idPostalCode) {
    return async (dispatch) => {
        dispatch({ type: FETCH_POSTAL_CODE_REQUEST });
        await axios.get(`${baseurl.url}/api/v1/postal-codes/get_postal-code/${idPostalCode}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_POSTAL_CODE_SUCCESS, payload: response.data.data });
            dispatch({ type: FETCH_POSTAL_CODE_SUCCESS, payload: {} });
        })
            .catch((error) => {
                dispatch({ type: FETCH_POSTAL_CODE_FAILURE, payload: error.message })
                //console.log(error);
            });
    }
}







export function PostalCodeCreate(data) {
    return async (dispatch) => {
        dispatch({ type: FETCH_POSTAL_CODE_REQUEST });
        await axios.post(`${baseurl.url}/api/v1/postal-codes/create`,data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_POSTAL_CODE_SUCCESS, payload: response.data.data });
            toast.success(response?.data?.message|| "Indicatif téléphone ajouté avec succès",{position:"bottom-right"})
            dispatch(fetchPostalCodesAll())
        })
            .catch((error) => {
                dispatch({ type: FETCH_POSTAL_CODE_FAILURE, payload: error.message })
            toast.error(error?.response?.data?.message|| "Indicatif non ajouté",{position:"bottom-right"})
                //console.log(error);
            });
    }
}




export function PostalCodeUpdateById(idPostalCode,data) {
    return async (dispatch) => {
        dispatch({ type: FETCH_POSTAL_CODE_REQUEST });
        await axios.put(`${baseurl.url}/api/v1/postal-codes/edit/${idPostalCode}`,data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_POSTAL_CODE_SUCCESS, payload: response.data.data });
            toast.success(response?.data?.message|| "Indicatif téléphone mis à jour avec succès",{position:"bottom-right"})
            dispatch(fetchPostalCodesAll())
        })
            .catch((error) => {
                dispatch({ type: FETCH_POSTAL_CODE_FAILURE, payload: error.message })
            toast.error(error?.response?.data?.message|| "Indicatif non mis à jour",{position:"bottom-right"})
                //console.log(error);
            });
    }
}







export function PostalCodeDeleteById(idPostalCode) {
    return async (dispatch) => {
        dispatch({ type: FETCH_POSTAL_CODE_REQUEST });
        await axios.delete(`${baseurl.url}/api/v1/postal-codes/delete/${idPostalCode}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_POSTAL_CODE_SUCCESS, payload: response.data.data });
            toast.success(response?.data?.message|| "Operation éffectuer avec succès",{position:"bottom-right"})
            dispatch(fetchPostalCodesAll())
        })
            .catch((error) => {
                dispatch({ type: FETCH_POSTAL_CODE_FAILURE, payload: error.message })
            toast.error(error?.response?.data?.message|| "Operation on effectuer",{position:"bottom-right"})
                //console.log(error);
            });
    }
}




