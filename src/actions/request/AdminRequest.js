import axios from "axios";
import { FETCH_ADMIN_SUCCESS, FETCH_ADMINS_FAILURE, FETCH_ADMINS_REQUEST, FETCH_ADMINS_SUCCESS, FETCH_ADMINS_SUCCESS_2, FETCH_ADMIN_FAILURE, FETCH_ADMIN_REQUEST } from "../../app/actions/actions";
import { ROUTES } from "../../config/routing";
import { dureeDeVie, getAndCheckLocalStorage, setWithExpiration } from "../../config/localvalueFunction";
import {  localStorageKeys } from "../../config/localvalue";
import { baseurl } from "../../config/baseurl";
import { saveDataToFile } from "../local/DataLocal";



// Create Admin
export const AdminCreate = (
    data,
    navigate,
    toast) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_ADMIN_REQUEST });
        await axios
            .post(
                `${baseurl.url}/api/v1/admins/create`,
                data,
                {
                    headers:
                    {
                        'Content-Type': 'application/json',
                        'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
                    }
                }
            )
            .then((response) => {
                toast.success(response?.data?.message||"Compte administrateur créer avec succès", { position: "bottom-right" });
                dispatch({ type: FETCH_ADMIN_SUCCESS });
                dispatch({ type: FETCH_ADMIN_SUCCESS, payload: {} });
                navigate(`/${ROUTES.LOGIN}`);
                // window.location.href = `/${ROUTES.LOGIN}`;

            })
            .catch((error) => {
                //console.log(error);
                dispatch({ type: FETCH_ADMIN_FAILURE, payload: error.message });
                toast.error(error?.response?.data?.message|| "Compte non créer", { position: "bottom-right" })
            });
    };
}


// All users of plateforme
export function fetchAdminsAll() {
    return async (dispatch) => {
        dispatch({ type: FETCH_ADMINS_REQUEST });
        const params = new URLSearchParams();
        // Préparer les paramètres de requête

        await axios.get(`${baseurl.url}/api/v1/admins/get_admins?${params.toString()}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_ADMINS_SUCCESS, payload: response.data.data });
            dispatch({ type: FETCH_ADMINS_SUCCESS_2, payload: response.data.data });
            saveDataToFile(response.data.data, localStorageKeys.Admins);
        })
            .catch((error) => {
                //console.log(error);
                dispatch({ type: FETCH_ADMINS_FAILURE, payload:  error?.response?.data?.message });
            });
    }
}











export function fetchAdminById(data) {
    return async (dispatch) => {
        dispatch({ type: FETCH_ADMIN_REQUEST });
        await axios.get(`${baseurl.url}/api/v1/admins/me`,data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_ADMIN_SUCCESS, payload: response.data.data });
        })
            .catch((error) => {
                dispatch({ type: FETCH_ADMIN_FAILURE, payload:  error?.response?.data?.message })
                //console.log(error);
            });
    }
}











// Reset password
export const AdminLogin = (
    data,
    toast) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_ADMIN_REQUEST });
        await axios
            .post(`${baseurl.url}/api/v1/admins/login`,
                data,
                {
                    headers:
                    {
                        'Content-Type': 'application/json',
                        'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
                    }
                }
            )
            .then((response) => {

                setWithExpiration(localStorageKeys.userId, response.data?.data?._id, dureeDeVie);
                setWithExpiration(localStorageKeys.userName, response.data?.data?.coverPicture, dureeDeVie);
                setWithExpiration(localStorageKeys.userEmail, response.data?.data?.coverPicture, dureeDeVie);
                setWithExpiration(localStorageKeys.profileRole, response.data?.data?.role, dureeDeVie);


                dispatch({ type: FETCH_ADMIN_SUCCESS,payload:response?.data?.data });
                toast.success(response?.data?.message || "Vous êtes maintenant connecté .", { position: "bottom-right" });
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message || "Connexion impossible", { position: "bottom-right" })
                dispatch({ type: FETCH_ADMIN_FAILURE, payload:  error?.response?.data?.message });
            });
    };
}


