import axios from "axios";
import { FETCH_CATEGORY_PRODUCT_SUCCESS, FETCH_CATEGORY_PRODUCTS_FAILURE, FETCH_CATEGORY_PRODUCTS_REQUEST, FETCH_CATEGORY_PRODUCTS_SUCCESS, FETCH_CATEGORY_PRODUCTS_SUCCESS_2, FETCH_CATEGORY_PRODUCT_FAILURE, FETCH_CATEGORY_PRODUCT_REQUEST } from "../../app/actions/actions";
import { ROUTES } from "../../config/routing";
import { dureeDeVie, getAndCheckLocalStorage, setWithExpiration } from "../../config/localvalueFunction";
import {  localStorageKeys } from "../../config/localvalue";
import { baseurl } from "../../config/baseurl";
import { saveDataToFile } from "../local/DataLocal";
import { toast } from "react-toastify";



// All users of plateforme
export function fetchPostalCodesAll() {
    return async (dispatch) => {
        dispatch({ type: FETCH_CATEGORY_PRODUCTS_REQUEST });
        const params = new URLSearchParams();

        await axios.get(`${baseurl.url}/api/v1/categorys/get_categorys?${params.toString()}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_CATEGORY_PRODUCTS_SUCCESS, payload: response.data.data });
            dispatch({ type: FETCH_CATEGORY_PRODUCTS_SUCCESS_2, payload: response.data.data });
            saveDataToFile(response.data.data, localStorageKeys.categorysData);
        })
            .catch((error) => {
                //console.log(error);
                dispatch({ type: FETCH_CATEGORY_PRODUCTS_FAILURE, payload: error.message });
            });
    }
}











export function fetchPostalCodeById(idPostalCode) {
    return async (dispatch) => {
        dispatch({ type: FETCH_CATEGORY_PRODUCT_REQUEST });
        await axios.get(`${baseurl.url}/api/v1/categorys/get_category/${idPostalCode}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_CATEGORY_PRODUCT_SUCCESS, payload: response.data.data });
            dispatch({ type: FETCH_CATEGORY_PRODUCT_SUCCESS, payload: {} });
        })
            .catch((error) => {
                dispatch({ type: FETCH_CATEGORY_PRODUCT_FAILURE, payload: error.message })
                //console.log(error);
            });
    }
}







export function PostalCodeCreate(data) {
    return async (dispatch) => {
        dispatch({ type: FETCH_CATEGORY_PRODUCT_REQUEST });
        await axios.post(`${baseurl.url}/api/v1/categorys/create`,data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_CATEGORY_PRODUCT_SUCCESS, payload: response.data.data });
            toast.success(response?.data?.message|| "Indicatif téléphone ajouté avec succès",{position:"bottom-right"})
            dispatch(fetchPostalCodesAll())
        })
            .catch((error) => {
                dispatch({ type: FETCH_CATEGORY_PRODUCT_FAILURE, payload: error.message })
            toast.error(error?.response?.data?.message|| "Indicatif non ajouté",{position:"bottom-right"})
                //console.log(error);
            });
    }
}




export function PostalCodeUpdateById(idPostalCode,data) {
    return async (dispatch) => {
        dispatch({ type: FETCH_CATEGORY_PRODUCT_REQUEST });
        await axios.put(`${baseurl.url}/api/v1/categorys/edit/${idPostalCode}`,data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_CATEGORY_PRODUCT_SUCCESS, payload: response.data.data });
            toast.success(response?.data?.message|| "Indicatif téléphone ajouté avec succès",{position:"bottom-right"})
            dispatch(fetchPostalCodesAll())
        })
            .catch((error) => {
                dispatch({ type: FETCH_CATEGORY_PRODUCT_FAILURE, payload: error.message })
            toast.error(error?.response?.data?.message|| "Indicatif non ajouté",{position:"bottom-right"})
                //console.log(error);
            });
    }
}







export function PostalCodeDeleteById(idPostalCode) {
    return async (dispatch) => {
        dispatch({ type: FETCH_CATEGORY_PRODUCT_REQUEST });
        await axios.delete(`${baseurl.url}/api/v1/categorys/delete/${idPostalCode}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_CATEGORY_PRODUCT_SUCCESS, payload: response.data.data });
            toast.success(response?.data?.message|| "Indicatif téléphone ajouté avec succès",{position:"bottom-right"})
            dispatch(fetchPostalCodesAll())
        })
            .catch((error) => {
                dispatch({ type: FETCH_CATEGORY_PRODUCT_FAILURE, payload: error.message })
            toast.error(error?.response?.data?.message|| "Indicatif non ajouté",{position:"bottom-right"})
                //console.log(error);
            });
    }
}




