import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiChevronDown, FiMail, FiMessageCircle, FiSend } from "react-icons/fi";
import { toast } from "sonner";
import { replyToContact } from "../../redux/actions/contactActions";
import AdminLayout from "../../components/layout/AdminLayout";
import moment from "moment/moment";

const ContactList = () => {
    const dispatch = useDispatch();
    const { contacts, loading } = useSelector((state) => state.contacts);
    const [openAccordion, setOpenAccordion] = useState(null); // État pour gérer l'accordéon
    const [selectedContact, setSelectedContact] = useState(null); // État pour le contact sélectionné
    const [responseMessage, setResponseMessage] = useState(""); // État pour le message de réponse
    const [isModalOpen, setIsModalOpen] = useState(false); // État pour ouvrir/fermer le modal

    // Ouvrir/Fermer l'accordéon
    const toggleAccordion = (id) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    // Ouvrir le modal et sélectionner le contact
    const openModal = (contact) => {
        setSelectedContact(contact);
        setIsModalOpen(true);
    };

    // Fermer le modal
    const closeModal = () => {
        setIsModalOpen(false);
        setResponseMessage("");
        setSelectedContact(null);
    };

    // Gestion de la soumission de la réponse
    const handleSubmitResponse = async () => {
        if (!responseMessage.trim()) {
            toast.error("Le message de réponse ne peut pas être vide.");
            return;
        }

        try {
            await dispatch(replyToContact(selectedContact._id, responseMessage));
            toast.success("Réponse envoyée avec succès !");
            closeModal();
        } catch (error) {
            toast.error("Erreur lors de l'envoi de la réponse.");
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-screen">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="container p-4 mx-auto">
                <h1 className="mb-6 text-2xl font-bold text-center">Liste des Contacts</h1>

                {/* Tableau des Contacts */}
                <div className="space-y-4">
                    {contacts.length === 0 ? (
                        <p className="text-center text-gray-500">Aucun message reçu.</p>
                    ) : (
                        contacts.map((contact) => (
                            <div key={contact._id} className="overflow-hidden bg-white rounded-lg shadow-md">
                                {/* En-tête de l'accordéon */}
                                <button
                                    onClick={() => toggleAccordion(contact._id)}
                                    className="flex items-center justify-between w-full px-4 py-3 transition bg-white hover:bg-gray-50"
                                >
                                    <div className="flex items-center space-x-2">
                                        <FiMail size={20} className="text-red-500" />
                                        <span>{contact.name} ( {new Date(contact.createdAt).toLocaleDateString()} {moment(contact.createdAt).format("HH:MM")} )</span>
                                    </div>
                                    <FiChevronDown
                                        size={20}
                                        className={`transition-transform ${openAccordion === contact._id ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {/* Contenu de l'accordéon */}
                                {openAccordion === contact._id && (
                                    <div className="p-4 space-y-2">
                                        <p>
                                            <strong>Email:</strong> {contact.email}
                                        </p>
                                        <p>
                                            <strong>Téléphone:</strong> {contact.phone}
                                        </p>
                                        {
                                            contact?.subjet && (
                                                <p>
                                                    <strong>Objet :</strong> {contact.subjet}
                                                </p>
                                            )
                                        }

                                        <p>
                                            <strong>Message:</strong> {contact.message}
                                        </p>
                                        <p>
                                            <strong>Date:</strong>{" "}
                                            {new Date(contact.createdAt).toLocaleDateString()} {moment(contact.createdAt).format("HH:MM")}
                                        </p>

                                        {/* Bouton Répondre */}
                                        <button
                                            onClick={() => openModal(contact)}
                                            className="px-4 py-2 text-white transition bg-red-500 rounded hover:bg-red-600"
                                        >
                                            Répondre <FiSend size={16} className="inline ml-1" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* Modal pour Répondre */}
                {isModalOpen && selectedContact && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="w-full max-w-md p-6 bg-white rounded-lg">
                            <h2 className="mb-4 text-xl font-bold">Répondre à {selectedContact.name}</h2>
                            <textarea
                                value={responseMessage}
                                onChange={(e) => setResponseMessage(e.target.value)}
                                placeholder="Votre réponse..."
                                rows="5"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            ></textarea>
                            <div className="flex justify-end mt-4 space-x-2">
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 text-gray-700 transition bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={handleSubmitResponse}
                                    className="px-4 py-2 text-white transition bg-red-500 rounded hover:bg-red-600"
                                >
                                    Envoyer <FiSend size={16} className="inline ml-1" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default ContactList;