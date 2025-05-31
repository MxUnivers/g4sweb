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
        <h1 className="mb-6 text-2xl font-bold text-center">Liste des Candidatures</h1>

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
                    className={`transition-transform ${openAccordion === contact._id ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Contenu de l'accordéon */}
                {openAccordion === contact._id && (
                  <div className="p-4 space-y-2">
                    {/* Informations Personnelles */}
                    <div>
                      <h3 className="font-semibold text-gray-700">Informations Personnelles :</h3>
                      <p><strong>Prénom :</strong> {contact.firstName}</p>
                      <p><strong>Nom :</strong> {contact.lastName}</p>
                      <p><strong>Date de naissance :</strong> {new Date(contact.dateOfBirth).toLocaleDateString()}</p>
                      <p><strong>Lieu de naissance :</strong> {contact.placeOfBirth}</p>
                      <p><strong>Nationalité :</strong> {contact.nationality}</p>
                      <p><strong>Genre :</strong> {contact.gender}</p>
                      <p><strong>État civil :</strong> {contact.maritalStatus}</p>
                      <p><strong>Nombre d'enfants :</strong> {contact.numberOfChildren}</p>
                    </div>

                    {/* Coordonnées */}
                    <div>
                      <h3 className="font-semibold text-gray-700">Coordonnées :</h3>
                      <p><strong>Adresse actuelle :</strong> {contact.currentAddress}</p>
                      <p><strong>Téléphone :</strong> {contact.phone}</p>
                      <p><strong>Email :</strong> {contact.email}</p>
                      <p><strong>Personne à contacter en cas d'urgence :</strong> {contact.emergencyContactName}</p>
                      <p><strong>Téléphone d'urgence :</strong> {contact.emergencyContactPhone}</p>
                    </div>

                    {/* Expérience & Formation */}
                    <div>
                      <h3 className="font-semibold text-gray-700">Expérience & Formation :</h3>
                      <p><strong>Expérience en sécurité :</strong> {contact.hasSecurityExperience ? "Oui" : "Non"}</p>
                      {contact.hasSecurityExperience && (
                        <>
                          <p><strong>Dernier employeur :</strong> {contact.previousEmployer}</p>
                          <p><strong>Années d'expérience :</strong> {contact.yearsOfExperience}</p>
                          <p><strong>Dernier poste occupé :</strong> {contact.lastPositionHeld}</p>
                        </>
                      )}
                      <p><strong>Formation en sécurité :</strong> {contact.securityTrainingCompleted ? "Oui" : "Non"}</p>
                      {contact.securityTrainingCompleted && (
                        <p><strong>Détails de la formation :</strong> {contact.trainingDetails}</p>
                      )}
                      <p><strong>Agrément en sécurité privée :</strong> {contact.hasSecurityLicense ? "Oui" : "Non"}</p>
                      <p><strong>Permis de conduire :</strong> {contact.hasDriverLicense ? "Oui" : "Non"}</p>
                      {contact.hasDriverLicense && (
                        <p><strong>Catégorie du permis :</strong> {contact.driverLicenseCategory}</p>
                      )}
                    </div>

                    {/* Compétences & Certifications */}
                    <div>
                      <h3 className="font-semibold text-gray-700">Compétences & Certifications :</h3>
                      <p><strong>Premiers secours :</strong> {contact.hasFirstAidSkills ? "Oui" : "Non"}</p>
                      <p><strong>Self-défense :</strong> {contact.hasSelfDefenseTraining ? "Oui" : "Non"}</p>
                      <p><strong>Autres compétences ou certifications :</strong> {contact.otherSkillsOrCertifications}</p>
                    </div>

                    {/* Disponibilité & Conditions de Travail */}
                    <div>
                      <h3 className="font-semibold text-gray-700">Disponibilité & Conditions de Travail :</h3>
                      <p><strong>Disponible pour travailler de nuit :</strong> {contact.availableForNightShifts ? "Oui" : "Non"}</p>
                      <p><strong>Disponible pour des déplacements :</strong> {contact.availableForTravel ? "Oui" : "Non"}</p>
                      <p><strong>Préférence de lieu de travail :</strong> {contact.preferredWorkLocation}</p>
                    </div>

                    {/* Documents à Joindre */}
                    <div>
                      <h3 className="font-semibold text-gray-700">Documents à Joindre :</h3>
                      {contact.attachedDocuments.length > 0 ? (
                        <ul className="pl-5 space-y-1 list-disc">
                          {contact.attachedDocuments.map((doc, index) => (
                            <li key={index}>
                              <a href={doc.documentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                {doc.documentType.toUpperCase()} - {doc.documentUrl.split("/").pop()}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>Aucun document joint.</p>
                      )}
                    </div>

                    {/* Message Initial */}
                    <div>
                      <h3 className="font-semibold text-gray-700">Message :</h3>
                      <p>{contact.message}</p>
                    </div>

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