import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiThumbsUp } from 'react-icons/fi';
import StoreLayout from '../../components/layout/StoreLayout';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ici tu peux envoyer les données à ton backend
        console.log('Formulaire envoyé:', formData);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000); // Reset après 3s
    };

    return (
        <StoreLayout>
            {/* Hero Section */}
            <section className="py-5 bg-danger text-white">
                <div className="container">
                    <h1 className="display-5 fw-bold mb-3 text-white">Nous contacter</h1>
                    <p className="lead  text-light">Une question ? Un problème ? Remplissez le formulaire ci-dessous ou consultez nos coordonnées.</p>
                </div>
            </section>

            <div className="container py-5">
                <div className="row g-5">
                    {/* Formulaire de contact */}
                    <div className="col-md-7">
                        <h2 className="mb-4">Envoyez-nous un message</h2>
                        {submitted ? (
                            <div className="alert alert-success" role="alert">
                                Votre message a été envoyé avec succès !
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Nom</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        placeholder="Votre nom"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Votre email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="subject" className="form-label">Sujet</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="subject"
                                        name="subject"
                                        placeholder="Sujet du message"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">Message</label>
                                    <textarea
                                        className="form-control"
                                        id="message"
                                        name="message"
                                        rows="5"
                                        placeholder="Écrivez votre message..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-danger mt-3">
                                    Envoyer le message
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Informations de contact */}
                    <div className="col-md-5">
                        <h2 className="mb-4">Nos coordonnées</h2>

                        {/* Email */}
                        <div className="d-flex align-items-start mb-4">
                            <FiMail size={24} className="me-3 text-danger" />
                            <div>
                                <h6>Email</h6>
                                <p className="mb-0">
                                    <a href="mailto:contact@estore.com" className="text-decoration-none text-dark">
                                        contact@estore.com
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* Téléphone */}
                        <div className="d-flex align-items-start mb-4">
                            <FiPhone size={24} className="me-3 text-danger" />
                            <div>
                                <h6>Téléphone</h6>
                                <p className="mb-0">
                                    <a href="tel:+33123456789" className="text-decoration-none text-dark">
                                        +33 1 23 45 67 89
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* Adresse */}
                        <div className="d-flex align-items-start mb-4">
                            <FiMapPin size={24} className="me-3 text-danger" />
                            <div>
                                <h6>Adresse</h6>
                                <p className="mb-0">E-Store SAS<br />123 Rue du Commerce<br />75000 Paris - France</p>
                            </div>
                        </div>

                        {/* Confiance client */}
                        <div className="mt-4 p-3 bg-light rounded">
                            <h6 className="fw-bold d-flex align-items-center">
                                <FiThumbsUp className="me-2 text-success" /> Pourquoi nous faire confiance ?
                            </h6>
                            <ul className="list-group list-group-flush mt-2">
                                <li className="list-group-item bg-light ps-0 border-0">✔️ Paiement sécurisé</li>
                                <li className="list-group-item bg-light ps-0 border-0">✔️ Livraison express partout en Europe</li>
                                <li className="list-group-item bg-light ps-0 border-0">✔️ SAV réactif 7j/7</li>
                                <li className="list-group-item bg-light ps-0 border-0">✔️ Produits vérifiés</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Carte Google Maps (optionnel) */}
                <div className="mt-5">
                    {/* <h4 className="mb-3">Trouvez-nous</h4>
                    <div className="ratio ratio-16x9 rounded shadow-sm overflow-hidden">
                    </div> */}
                </div>
            </div>
        </StoreLayout>
    );
}
export default ContactPage