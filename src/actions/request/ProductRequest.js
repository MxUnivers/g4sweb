import axios from "axios";
import { FETCH_PRODUCT_SUCCESS, FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_SUCCESS_2, FETCH_PRODUCT_FAILURE, FETCH_PRODUCT_REQUEST } from "../../app/actions/actions";
import { ROUTES } from "../../config/routing";
import { dureeDeVie, getAndCheckLocalStorage, setWithExpiration } from "../../config/localvalueFunction";
import {  localStorageKeys } from "../../config/localvalue";
import { baseurl } from "../../config/baseurl";
import { saveDataToFile } from "../local/DataLocal";
import { toast } from "react-toastify";



// All users of plateforme
export function fetchProductsAll(categoryId, name, minPrice, maxPrice, startDate, endDate) {
    return async (dispatch) => {
        dispatch({ type: FETCH_PRODUCTS_REQUEST });
        const params = new URLSearchParams();

        if (categoryId) params.append("categoryId", categoryId);
        if (name) params.append("name", name);
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);
        await axios.get(`${baseurl.url}/api/v1/products/get_products?${params.toString()}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data.data });
            dispatch({ type: FETCH_PRODUCTS_SUCCESS_2, payload: response.data.data });
            saveDataToFile(response.data.data, localStorageKeys.productsData);
        })
            .catch((error) => {
                //console.log(error);
                dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
            });
    }
}











export function fetchProductById(idProduct) {
    return async (dispatch) => {
        dispatch({ type: FETCH_PRODUCT_REQUEST });
        await axios.get(`${baseurl.url}/api/v1/products/get_product/${idProduct}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: response.data.data });
        })
            .catch((error) => {
                dispatch({ type: FETCH_PRODUCT_FAILURE, payload: error.message })
                //console.log(error);
            });
    }
}







export function ProductCreate(data) {
    return async (dispatch) => {
        dispatch({ type: FETCH_PRODUCT_REQUEST });
        await axios.post(`${baseurl.url}/api/v1/products/create`,data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: response.data.data });
            toast.success(response?.data?.message|| "Produit ajouté avec succès",{position:"bottom-right"})
            dispatch(fetchProductsAll())
        })
            .catch((error) => {
                dispatch({ type: FETCH_PRODUCT_FAILURE, payload: error.message })
            toast.error(error?.response?.data?.message|| "Produit non ajouté",{position:"bottom-right"})
                //console.log(error);
            });
    }
}




export function ProductUpdateById(idProduct,data) {
    return async (dispatch) => {
        dispatch({ type: FETCH_PRODUCT_REQUEST });
        await axios.put(`${baseurl.url}/api/v1/products/edit/${idProduct}`,data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: response.data.data });
            toast.success(response?.data?.message|| "Produit mis à jour avec succès",{position:"bottom-right"})
            dispatch(fetchProductsAll())
        })
            .catch((error) => {
                dispatch({ type: FETCH_PRODUCT_FAILURE, payload: error.message })
            toast.error(error?.response?.data?.message|| "Produit non mis à jour",{position:"bottom-right"})
                //console.log(error);
            });
    }
}







export function ProductDeleteById(idProduct) {
    return async (dispatch) => {
        dispatch({ type: FETCH_PRODUCT_REQUEST });
        await axios.delete(`${baseurl.url}/api/v1/products/delete/${idProduct}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: response.data.data });
            toast.success(response?.data?.message|| "Operation éffectuée avec succès",{position:"bottom-right"})
            dispatch(fetchProductsAll())
        })
            .catch((error) => {
                dispatch({ type: FETCH_PRODUCT_FAILURE, payload: error.message })
            toast.error(error?.response?.data?.message|| "Produit non éffectuée",{position:"bottom-right"})
                //console.log(error);
            });
    }
}




