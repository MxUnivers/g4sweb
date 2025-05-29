import axios from "axios";
import { FETCH_CUSTOMER_SUCCESS, FETCH_CUSTOMERS_FAILURE, FETCH_CUSTOMERS_REQUEST, FETCH_CUSTOMERS_SUCCESS, FETCH_CUSTOMERS_SUCCESS_2, FETCH_CUSTOMER_FAILURE, FETCH_CUSTOMER_REQUEST } from "../../app/actions/actions";
import { ROUTES } from "../../config/routing";
import { dureeDeVie, getAndCheckLocalStorage, setWithExpiration } from "../../config/localvalueFunction";
import { localStorageKeys } from "../../config/localvalue";
import { baseurl } from "../../config/baseurl";
import { saveDataToFile } from "../local/DataLocal";



// Create Customer
export const CustomerCreate = (
    data,
    navigate,
    toast) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_CUSTOMER_REQUEST });
        await axios
            .post(
                `${baseurl.url}/api/v1/customers/create`,
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
                toast.success(response?.data?.message||"Compte créer avec succès", { position: "bottom-right" });
                dispatch({ type: FETCH_CUSTOMER_SUCCESS });
                dispatch({ type: FETCH_CUSTOMER_SUCCESS, payload: {} });
                navigate(`/${ROUTES.LOGIN}`)
                // window.location.href = `/${ROUTES.LOGIN}`;

            })
            .catch((error) => {
                //console.log(error);
                dispatch({ type: FETCH_CUSTOMER_FAILURE, payload: error.message });
                toast.error(error?.response?.data?.message|| "Compte non créer", { position: "bottom-right" })
            });
    };
}





export const CustomerUpdateById = (
    data,
    toast) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_CUSTOMER_REQUEST });
        await axios
            .put(
                `${baseurl.url}/api/v1/customers/me`,
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
                toast.success("Compte mis a jour avec succès", { position: "bottom-right" });
                dispatch({ type: FETCH_CUSTOMER_SUCCESS, payload: response.data.data });
                dispatch({ type: FETCH_CUSTOMER_SUCCESS, payload: {} });
                // window.location.href = `/${ROUTES.LOGIN}`;
            })
            .catch((error) => {
                toast.error("Compte mis à jour du compte impossible", { position: "bottom-right" })
                dispatch({ type: FETCH_CUSTOMER_FAILURE, payload: error.message });
            });
    };
}















// Connexion Customer
export const CustomerConnexion = (usernameOremail, password, redirect, toast) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_CUSTOMER_REQUEST });
        await axios
            .post(`${baseurl.url}/api/v1/customers/login`, {
                "email": usernameOremail,
                "password": password
            }, {
                headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
                }
            })
            .then((response) => {
                //console.log(response.data.data)
                dispatch({ type: FETCH_CUSTOMER_SUCCESS });
                //console.log(response.data.data);
                setWithExpiration(localStorageKeys.userId, response.data?.data?._id, dureeDeVie);
                setWithExpiration(localStorageKeys.userCoverPicture, response.data?.data?.coverPicture, dureeDeVie);
                setWithExpiration(localStorageKeys.userEmail, response.data?.data?.coverPicture, dureeDeVie);
                setWithExpiration(localStorageKeys.userName, response.data?.data?.firstName + " " + response.data?.data?.lastName, dureeDeVie);
                setWithExpiration(localStorageKeys.profileRole, response.data?.data?.role, dureeDeVie);
                dispatch(fetchCustomersAll());
                toast.success("Vous étes maintenant connecté", { position: "bottom-right" });

                setTimeout(() => {
                    redirect(`/${ROUTES.dashboard}`);
                    // window.location.href = `/${ROUTES.DASHBOARD}`;
                }, 1000);
            })
            .catch((error) => {
                dispatch({ type: FETCH_CUSTOMER_FAILURE, payload: error.message });
                toast.error(error?.response?.data?.message || "Connexion Impossible", { position: "bottom-right" });
            });
    };
}







// All users of plateforme
export function fetchCustomersAll(startDate,
        endDate,
        minOrders,
        maxOrders,
        search,
        postalCode) {
    return async (dispatch) => {
        dispatch({ type: FETCH_CUSTOMERS_REQUEST });
        const params = new URLSearchParams();
        // Préparer les paramètres de requête
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);
        if (minOrders) params.append("minOrders", minOrders);
        if (maxOrders) params.append("maxOrders", maxOrders);
        if (search) params.append("search", search);
        if (postalCode) params.append("postalCode", postalCode);

        await axios.get(`${baseurl.url}/api/v1/customers/get_customers?${params.toString()}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_CUSTOMERS_SUCCESS, payload: response.data.data });
            dispatch({ type: FETCH_CUSTOMERS_SUCCESS_2, payload: response.data.data });
            saveDataToFile(response.data.data, localStorageKeys.customersData);
        })
            .catch((error) => {
                //console.log(error);
                dispatch({ type: FETCH_CUSTOMERS_FAILURE, payload: error.message });
            });
    }
}











export function fetchCustomerById(idCustomer) {
    return async (dispatch) => {
        dispatch({ type: FETCH_CUSTOMER_REQUEST });
        await axios.get(`${baseurl.url}/api/v1/customers/get_customer/${idCustomer}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
            }
        }).then((response) => {
            //console.log(response.data.data);
            dispatch({ type: FETCH_CUSTOMER_SUCCESS, payload: response.data.data });
            dispatch({ type: FETCH_CUSTOMER_SUCCESS, payload: {} });
        })
            .catch((error) => {
                dispatch({ type: FETCH_CUSTOMER_FAILURE, payload: error.message })
                //console.log(error);
            });
    }
}









export const CustomerUpdatePassword = (data ,toast) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_CUSTOMERS_REQUEST });

        await axios
            .post(`${baseurl.url}/api/v1/customers/me/password`,
                {
                    headers:
                    {
                        'Content-Type': 'application/json',
                        'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
                    }
                }
            )
            .then((response) => {
                toast.success("Mot de passe mis à jour avec succès", { position: "bottom-right" })
                dispatch({ type: FETCH_CUSTOMER_SUCCESS });
                dispatch({ type: FETCH_CUSTOMER_SUCCESS, payload: {} });
            })
            .catch((error) => {
                toast.error("Mot de passe non mis à jour", { position: "bottom-right" })
                dispatch({ type: FETCH_CUSTOMER_FAILURE, payload: error.message });
            });
    };
}



// Reset password
export const CustomerSendCodeverfiy = (
    email,
    phone,
    setSept,
    toast) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_CUSTOMER_REQUEST });
        await axios
            .post(`${baseurl.url}/api/v1/customers/send-code-verify`,
                {
                    email,
                    phone
                },
                {
                    headers:
                    {
                        'Content-Type': 'application/json',
                        'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
                    }
                }
            )
            .then((response) => {
                toast.success(response?.data?.message || "Un code vous été envoyer sur votre email .", { position: "bottom-right" });
                setSept(2)
                dispatch({ type: FETCH_CUSTOMER_SUCCESS });
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message || "Le code n'a pas été entrez email valide . ", { position: "bottom-right" })
                dispatch({ type: FETCH_CUSTOMER_FAILURE, payload: error.message });
            });
    };
}




// Reset password
export const CustomerverfiyCode = (
    email, phone,
    passwordverifield,
    setStep,
    toast) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_CUSTOMER_REQUEST });
        await axios
            .post(`${baseurl.url}/api/v1/customers/verfiy-code-reset`,
                {
                    _id: email || phone,
                    email,
                    phone,
                    passwordverifield,
                },
                {
                    headers:
                    {
                        'Content-Type': 'application/json',
                        'Authorization': `${baseurl.TypeToken} ${baseurl.token}`
                    }
                }
            )
            .then((response) => {
                toast.success(response?.data?.message || "Le Code est accepter avec succès .", { position: "bottom-right" });
                dispatch({ type: FETCH_CUSTOMER_SUCCESS });
                setStep(3)
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message || "Le code n'a pas été accepter entrer un code valide ", { position: "bottom-right" })
                dispatch({ type: FETCH_CUSTOMER_FAILURE, payload: error.message });
            });
    };
}



