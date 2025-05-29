import axios from "axios";
import { FETCH_ORDER_SUCCESS, FETCH_ORDERS_FAILURE, FETCH_ORDERS_REQUEST, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_SUCCESS_2, FETCH_ORDER_FAILURE, FETCH_ORDER_REQUEST } from "../../app/actions/actions";
import { ROUTES } from "../../config/routing";
import { dureeDeVie, getAndCheckLocalStorage, setWithExpiration } from "../../config/localvalueFunction";
import {  localStorageKeys } from "../../config/localvalue";
import { baseurl } from "../../config/baseurl";
import { saveDataToFile } from "../local/DataLocal";
import { toast } from "react-toastify";



// All users of plateforme
export function fetchOrdersAll(categoryId, name, minPrice, maxPrice, startDate, endDate) {
    return async (dispatch) => {
        dispatch({ type: FETCH_ORDERS_REQUEST });
        const params = new URLSearchParams();

        if (categoryId) params.append("categoryId", categoryId);
        if (name) params.append("name", name);
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);
        await axios.get(`${baseurl.url}/api/v1/orders/get_orders?${params.toString()}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_ORDERS_SUCCESS, payload: response.data.data });
            dispatch({ type: FETCH_ORDERS_SUCCESS_2, payload: response.data.data });
            saveDataToFile(response.data.data, localStorageKeys.ordersData);
        })
            .catch((error) => {
                //console.log(error);
                dispatch({ type: FETCH_ORDERS_FAILURE, payload: error.message });
            });
    }
}











export function fetchOrderById(idOrder) {
    return async (dispatch) => {
        dispatch({ type: FETCH_ORDER_REQUEST });
        await axios.get(`${baseurl.url}/api/v1/orders/get_order/${idOrder}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_ORDER_SUCCESS, payload: response.data.data });
        })
            .catch((error) => {
                dispatch({ type: FETCH_ORDER_FAILURE, payload: error.message })
                //console.log(error);
            });
    }
}







export function OrderCreate(data) {
    return async (dispatch) => {
        dispatch({ type: FETCH_ORDER_REQUEST });
        await axios.post(`${baseurl.url}/api/v1/orders/create`,data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_ORDER_SUCCESS, payload: response.data.data });
            toast.success(response?.data?.message|| "Commande ajouté avec succès",{position:"bottom-right"})
            dispatch(fetchOrdersAll())
        })
            .catch((error) => {
                dispatch({ type: FETCH_ORDER_FAILURE, payload: error.message })
            toast.error(error?.response?.data?.message|| "Commande non ajouté",{position:"bottom-right"})
                //console.log(error);
            });
    }
}




export function OrderUpdateById(idOrder,data) {
    return async (dispatch) => {
        dispatch({ type: FETCH_ORDER_REQUEST });
        await axios.put(`${baseurl.url}/api/v1/orders/edit/${idOrder}`,data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_ORDER_SUCCESS, payload: response.data.data });
            toast.success(response?.data?.message|| "Commande mis à jour avec succès",{position:"bottom-right"})
            dispatch(fetchOrdersAll())
        })
            .catch((error) => {
                dispatch({ type: FETCH_ORDER_FAILURE, payload: error.message })
            toast.error(error?.response?.data?.message|| "Commande non mis à jour",{position:"bottom-right"})
                //console.log(error);
            });
    }
}





export function OrderAddItemById(idOrder,data) {
    return async (dispatch) => {
        dispatch({ type: FETCH_ORDER_REQUEST });
        await axios.put(`${baseurl.url}/api/v1/orders/add/${idOrder}/items`,data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_ORDER_SUCCESS, payload: response.data.data });
            toast.success(response?.data?.message|| "Elements ajouté à la commande",{position:"bottom-right"})
            dispatch(fetchOrdersAll())
        })
            .catch((error) => {
                dispatch({ type: FETCH_ORDER_FAILURE, payload: error.message })
            toast.error(error?.response?.data?.message|| "Element non ajouté à la commande",{position:"bottom-right"})
                //console.log(error);
            });
    }
}




export function OrderDeleteItemById(idOrder,idOrderItem,data) {
    return async (dispatch) => {
        dispatch({ type: FETCH_ORDER_REQUEST });
        await axios.put(`${baseurl.url}/api/v1/orders/delete/${idOrder}/items/${idOrderItem}`,data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_ORDER_SUCCESS, payload: response.data.data });
            toast.success(response?.data?.message|| "Element supprimé de la commande",{position:"bottom-right"})
            dispatch(fetchOrdersAll())
        })
            .catch((error) => {
                dispatch({ type: FETCH_ORDER_FAILURE, payload: error.message })
            toast.error(error?.response?.data?.message|| "Element non supprimé de la commande",{position:"bottom-right"})
                //console.log(error);
            });
    }
}



export function OrderDeleteById(idOrder) {
    return async (dispatch) => {
        dispatch({ type: FETCH_ORDER_REQUEST });
        await axios.delete(`${baseurl.url}/api/v1/orders/delete/${idOrder}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_ORDER_SUCCESS, payload: response.data.data });
            toast.success(response?.data?.message|| "Operation éffectuée avec succès",{position:"bottom-right"})
            dispatch(fetchOrdersAll())
        })
            .catch((error) => {
                dispatch({ type: FETCH_ORDER_FAILURE, payload: error.message })
            toast.error(error?.response?.data?.message|| "Commande non éffectuée",{position:"bottom-right"})
                //console.log(error);
            });
    }
}




