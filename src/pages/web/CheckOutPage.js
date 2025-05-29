import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiShoppingBag } from 'react-icons/fi';
import { toast } from 'sonner';
import StoreLayout from '../../components/layout/StoreLayout';
import { createOrder } from '../../redux/actions/orderActions';
import { baseurl } from '../../config/baseurl';
import axios from 'axios';
import { MdLocationOn } from 'react-icons/md';
import { getPostalcodes } from '../../redux/actions/postalcodeActions';
import { Card, ListGroup } from 'react-bootstrap';

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { items, total } = useSelector((state) => state.cart);

    const { postalcodes } = useSelector((state) => state.postalcodes);

    const paymentMethods = [
        { id: 'MTN', name: 'Mobile Money (MTN)', icon: 'assets/images/Mtn-logo.png' },
        { id: 'MOOV', name: 'Mobile Money (Moov)', icon: 'assets/images/moov-logo.webp' },
        { id: 'ORANGE', name: 'Mobile Money (Orange)', icon: 'assets/images/ornage-logo.png' },
        { id: 'WAVE', name: 'Wave', icon: 'assets/images/wave-logo.png' },
        { id: 'CASH', name: 'Espèces', icon: 'assets/images/cashlogo-.jpg' },
    ];

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        postalCode: '',
        items: [],
        lat: "",
        lng: "",
        paymentMethod: null
    });

    
    const handleSelect = (method) => {
         setFormData((prev) => ({
                ...prev,
                paymentMethod: method,
         }))
    };

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Remplir les champs si l'utilisateur est connecté
    useEffect(() => {
        dispatch(getPostalcodes());
        if (items && items.length > 0) {
            setFormData((prev) => ({
                ...prev,
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: '',
                postalCode: '',
                items: items,
                lat: "",
                lng: "",
                paymentMethod: null
            }));
        } else {
            navigate(-1);
        }
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    // Remplir les champs si l'utilisateur est connecté
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Vérifier que le panier n'est pas vide
        if (!items || items.length === 0) {
            toast.error('Votre panier est vide');
            return;
        }
        if (!formData.paymentMethod) {
            toast.error('Veillez selectionez le moyen de paiement');
            return;
        }

        // Vérifier les champs requis
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'postalCode',];
        const missingFields = requiredFields.filter(field => !formData[field]?.trim());

        if (missingFields.length > 0) {
            setError(`Veuillez remplir les champs suivants : ${missingFields.join(', ')}`);
            toast.error(`Veillez renseignez votre champ `);
            return;
        }


        await dispatch(createOrder(formData));
    };



    const [pickupLocation, setPickupLocation] = useState('');
    const [pickupSuggestions, setPickupSuggestions] = useState([]);

    // Obtenir les suggestions de lieu de départ
    const getPlacesByCountryStartLocation = async (query) => {
        try {
            const response = await axios.get(`${baseurl.url}/places`, {
                params: { query: query },
            });
            const places = response.data.results;
            return places.map(place => place);
        } catch (error) {
            console.error("Erreur lors de la récupération des lieux : ", error);
        }
    };

    const handlePickupLocationChange = async (e) => {
        const value = e.target.value;
        console.log(value);
        setPickupLocation(value);
        if (value.length > 2) {
            const suggestions = await getPlacesByCountryStartLocation(value);
            setPickupSuggestions(suggestions);
        } else {
            setPickupSuggestions([]); // Réinitialiser la liste des suggestions
        }
    };
    const handlePickupSelection = (suggestion) => {
        // Met à jour le pickupLocation
        setPickupLocation(`${suggestion.name} - ${suggestion.formatted_address}`);
        // Met à jour newVehicle en une seule fois avec toutes les nouvelles valeurs
        setFormData(prevState => ({
            ...prevState,
            address: `${suggestion.name} - ${suggestion.formatted_address}`,
            lat: suggestion?.geometry?.location?.lat,
            lng: suggestion?.geometry?.location?.lng
        }));
        setPickupSuggestions([]);
    };

    const handleCleanSugestions = () => {
        setPickupSuggestions([]);
    }


    return (
        <StoreLayout>
            <div className="container py-5" onClick={handleCleanSugestions}>
                <div className="mb-4 p-4 bg-white rounded shadow-sm border-start border-4 border-danger">
                    <h1 className="text-3xl font-bold text-dark mb-2">
                        Passer votre commande
                    </h1>
                </div>
                {/* Formulaire */}
                <form onSubmit={handleSubmit}>
                    <div className="row g-4">
                        {/* Informations client */}
                        <div className="col-md-6">
                            <div className="card shadow-sm border-0 mb-4">
                                <div className="card-body">
                                    <h5 className="card-title fw-bold mb-3">Vos informations</h5>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label htmlFor="firstName" className="form-label">Prénom</label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                className="form-control"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="lastName" className="form-label">Nom</label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                className="form-control"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="form-control"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="phone" className="form-label">Téléphone</label>
                                            <input
                                                type="text"
                                                id="phone"
                                                name="phone"
                                                className="form-control"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="postalCode" className="form-label">Code postal</label>
                                            <select className="form-select"
                                                id="postalCode"
                                                name="postalCode"
                                                value={formData.postalCode} onChange={handleChange}>
                                                <option value={true}>-- Choix --</option>
                                                {postalcodes.map((code) => (
                                                    <option value={code._id}>
                                                        {code.indicatif}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="address" className="form-label">Adresse de livraison</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="rechercher le lieu"
                                                value={pickupLocation}
                                                onChange={(e) => { handlePickupLocationChange(e) }}
                                            />
                                            {pickupSuggestions && pickupSuggestions.length > 0 && (
                                                <ul className="rounded p-1 border" style={{ position: 'absolute', zIndex: 1000, backgroundColor: 'white', maxwidth: "500px", listStyleType: 'none', padding: 0, maxHeight: "200px", overflow: "auto" }}>
                                                    {pickupSuggestions.map((suggestion, index) => (
                                                        <li className="border"
                                                            key={index}
                                                            style={{ padding: '5px', cursor: 'pointer' }}
                                                            onClick={() => handlePickupSelection(suggestion)}
                                                        >
                                                            <MdLocationOn />  {`${suggestion.name} - ${suggestion.formatted_address}`}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Récapitulatif */}
                        <div className="col-md-6">
                            <div className="card shadow-sm border-0 sticky-top" style={{ top: '80px', zIndex: 50 }}>
                                <div className="card-body">
                                    <h5 className="card-title fw-bold mb-3">Récapitulatif</h5>
                                    <hr />

                                    {/* Carte de paiement */}

                                    <Card className="shadow-sm border-0 mb-4">
                                        <Card.Header className="bg-white border-bottom">
                                            <h5 className="mb-0">Moyen de paiement</h5>
                                        </Card.Header>
                                        <ListGroup variant="flush">
                                            {paymentMethods.map((method) => (
                                                <ListGroup.Item
                                                    key={method.id}
                                                    className={`d-flex align-items-center py-3 px-4 ${formData.paymentMethod === method.id ? 'bg-light border-start border-danger border-3' : ''
                                                        }`}
                                                    action
                                                    onClick={() => handleSelect(method.id)}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <div className="me-3">
                                                        {/* Icône du moyen de paiement */}
                                                        <img src={method.icon} alt={method.name} width="30" height="30" />
                                                    </div>
                                                    <div className="flex-grow-1">{method.name}</div>
                                                    <div>
                                                        <input
                                                            type="radio"
                                                            name="paymentMethod"
                                                            value={method.id}
                                                            checked={formData.paymentMethod === method.id}
                                                            onChange={() => handleSelect(method.id)}
                                                            className="form-check-input"
                                                        />
                                                    </div>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                        <Card.Footer className="bg-white border-top text-end">
                                            {formData.paymentMethod ? (
                                                <small className="text-success">Sélectionné : {formData.paymentMethod}</small>
                                            ) : (
                                                <small className="text-muted">Veuillez choisir un moyen de paiement</small>
                                            )}
                                        </Card.Footer>
                                    </Card>

                                    {items && items.length === 0 ? (
                                        <p className="text-muted text-center mt-5">Votre panier est vide.</p>
                                    ) : (
                                        <>
                                            <ul className="list-group list-group-flush mb-3">
                                                {items.map((item, index) => (
                                                    <li key={index} className="list-group-item px-0 py-2">
                                                        <div className="d-flex justify-content-between">
                                                            <span>{item.product.name}</span>
                                                            <strong>{(item.product.price * item.quantity).toFixed(2)} F</strong>
                                                        </div>
                                                        <small className="text-muted">Quantité: {item.quantity}</small>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="d-flex justify-content-between fw-bold mb-3">
                                                <span>Total</span>
                                                <span>{total.toFixed(2)} F</span>
                                            </div>
                                        </>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading || items.length === 0}
                                        className="btn btn-danger w-100 mt-3"
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Envoi...
                                            </>
                                        ) : (
                                            <>
                                                <FiShoppingBag className="me-2" /> Passer la commande
                                            </>
                                        )}
                                    </button>

                                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </StoreLayout>
    );
};



export default CheckoutPage;
