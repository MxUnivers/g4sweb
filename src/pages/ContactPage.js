import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { createContact } from "../redux/actions/contactActions";
import {
  FiPhone,
  FiMail,
} from "react-icons/fi"; // Import necessary icons
import { Link } from "react-router-dom";
import StoreLayout from "../components/layout/StoreLayout";
import { handleImageUploadCloudOnly } from "../actions/upload/UploadCloud";

const ContactPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    placeOfBirth: "",
    nationality: "",
    gender: "",
    maritalStatus: "",
    numberOfChildren: 0,
    currentAddress: "",
    phone: "",
    email: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    hasSecurityExperience: false,
    previousEmployer: "",
    yearsOfExperience: 0,
    lastPositionHeld: "",
    securityTrainingCompleted: false,
    trainingDetails: "",
    hasSecurityLicense: false,
    hasDriverLicense: false,
    driverLicenseCategory: "",
    hasFirstAidSkills: false,
    hasSelfDefenseTraining: false,
    otherSkillsOrCertifications: "",
    availableForNightShifts: false,
    availableForTravel: false,
    preferredWorkLocation: "",
    attachedDocuments: [],
    declaration: false,
    signature: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  // Fonction pour gérer le téléchargement des fichiers
  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files); // Récupère tous les fichiers sélectionnés

    if (!files || files.length === 0) {
      toast.error("Aucun fichier sélectionné.");
      return;
    }

    try {
      const uploadedFiles = await Promise.all(
        files.map(async (file) => {
          // Simulez ou implémentez ici votre fonction de téléchargement vers un service cloud
          const url = await handleImageUploadCloudOnly(file);
          return { documentType: file.name.split(".").pop(), documentUrl: url };
        })
      );

      // Mettre à jour l'état avec les nouveaux fichiers joints
      setFormData((prevData) => ({
        ...prevData,
        attachedDocuments: [...prevData.attachedDocuments, ...uploadedFiles],
      }));

      toast.success("Fichiers téléchargés avec succès");
    } catch (error) {
      toast.error("Erreur lors du traitement des fichiers.");
    }
  };


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(createContact(formData));
      toast.success("Votre message a été envoyé avec succès !");
      setFormData({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        placeOfBirth: "",
        nationality: "",
        gender: "",
        maritalStatus: "",
        numberOfChildren: 0,
        currentAddress: "",
        phone: "",
        email: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
        hasSecurityExperience: false,
        previousEmployer: "",
        yearsOfExperience: 0,
        lastPositionHeld: "",
        securityTrainingCompleted: false,
        trainingDetails: "",
        hasSecurityLicense: false,
        hasDriverLicense: false,
        driverLicenseCategory: "",
        hasFirstAidSkills: false,
        hasSelfDefenseTraining: false,
        otherSkillsOrCertifications: "",
        availableForNightShifts: false,
        availableForTravel: false,
        preferredWorkLocation: "",
        attachedDocuments: [],
        declaration: false,
        signature: "",
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
      toast.error("Une erreur est survenue lors de l'envoi du message.");
    } finally {
      setLoading(false);
    }
  };


  const handleDeleteFile = (index) => {
    // Créez une copie des fichiers joints actuels
    const updatedDocuments = [...formData.attachedDocuments];

    // Supprimez le fichier à l'index spécifié
    updatedDocuments.splice(index, 1);

    // Mettez à jour l'état avec la nouvelle liste de fichiers
    setFormData((prevData) => ({
      ...prevData,
      attachedDocuments: updatedDocuments,
    }));

    toast.success("Fichier supprimé avec succès", { position: "bottom-right" });
  };

  return (
    <StoreLayout>
      {/* Header */}

      {/* Main Content */}
      <main className="px-10 pb-8 mx-10 ">
        {/* Join our team section */}
        <section className="p-8 mb-8 text-white bg-red-500">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <h2 className="mb-4 text-2xl font-bold">Rejoignez notre équipe</h2>
              <p className="mb-4">
                Rejoignez notre équipe en expansion ! Nous offrons à nos employés une gamme immense d'opportunités professionnelles excitantes, récompensantes et à long terme où ils peuvent vraiment faire une différence de manière significative.
              </p>
              <p className="mb-4">
                Vous ne trouverez pas la variété et la diversité des opportunités professionnelles nulle part ailleurs.
              </p>
              <h3 className="mb-4 text-xl font-bold">Visitez le tableau de bord G4S</h3>
              <button className="px-4 py-2 text-red-500 bg-white rounded-md hover:bg-red-100">
                Rejoindre notre équipe
              </button>
            </div>
            <div className="md:w-1/2">
              <img src="images/team.jpg" alt="Team Image" className="object-cover w-full h-64" />
            </div>
          </div>
        </section>

        {/* Contact us section */}
        {/* <section id="contact-us" className="mb-8">
          <h2 className="mb-4 text-2xl font-bold text-red-500">Nous contacter</h2>
          <p className="mb-4">
            Pour être connecté au département pertinent, veuillez appeler notre standard téléphonique.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-lg font-bold">Standard téléphonique G4S</h3>
              <p>UK 08:00 - 17:00 Lundi - Vendredi</p>
            </div>
            <div className="flex items-center">
              <div className="p-3 mr-4 bg-white rounded-full">
                <FiPhone size={24} color="red" />
              </div>
              <p>+44 (0)20 770 7000</p>
            </div>
          </div>
        </section> */}

        {/* Contact form */}

        <section className="container w-full px-4 py-12 mx-auto">
          {/* Grille principale */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-1">
            {/* Formulaire de Contact */}
            <section id="contact-form" className="mb-8">
              <h2 className="mb-4 text-3xl font-bold">Formulaire de candidature</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Informations Personnelles */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800">1. Informations Personnelles</h2>
                  <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        Prénom
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        maxLength={100}
                        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        placeholder="Prénom"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Nom
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        maxLength={100}
                        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        placeholder="Nom"
                      />
                    </div>
                    <div>
                      <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                        Date de naissance
                      </label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="placeOfBirth" className="block text-sm font-medium text-gray-700">
                        Lieu de naissance
                      </label>
                      <input
                        type="text"
                        id="placeOfBirth"
                        name="placeOfBirth"
                        value={formData.placeOfBirth}
                        onChange={handleChange}
                        required
                        maxLength={100}
                        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        placeholder="Lieu de naissance"
                      />
                    </div>
                    <div>
                      <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">
                        Nationalité
                      </label>
                      <input
                        type="text"
                        id="nationality"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                        required
                        maxLength={50}
                        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        placeholder="Nationalité"
                      />
                    </div>
                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                        Genre
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      >
                        <option value="">Sélectionnez un genre</option>
                        <option value="Homme">Homme</option>
                        <option value="Femme">Femme</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700">
                        État civil
                      </label>
                      <select
                        id="maritalStatus"
                        name="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleChange}
                        required
                        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      >
                        <option value="">État civil</option>
                        <option value="Célibataire">Célibataire</option>
                        <option value="Marié(e)">Marié(e)</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="numberOfChildren" className="block text-sm font-medium text-gray-700">
                        Nombre d'enfants
                      </label>
                      <input
                        type="number"
                        id="numberOfChildren"
                        name="numberOfChildren"
                        value={formData.numberOfChildren}
                        onChange={handleChange}
                        min={0}
                        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        placeholder="Nombre d'enfants"
                      />
                    </div>
                  </div>
                </div>

                {/* Coordonnées */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800">2. Coordonnées</h2>
                  <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="currentAddress" className="block text-sm font-medium text-gray-700">
                        Adresse actuelle
                      </label>
                      <input
                        type="text"
                        id="currentAddress"
                        name="currentAddress"
                        value={formData.currentAddress}
                        onChange={handleChange}
                        required
                        maxLength={200}
                        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        placeholder="Adresse actuelle"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        maxLength={20}
                        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        placeholder="Téléphone"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        maxLength={150}
                        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        placeholder="Email"
                      />
                    </div>
                    <div>
                      <label htmlFor="emergencyContactName" className="block text-sm font-medium text-gray-700">
                        Personne à contacter en cas d'urgence
                      </label>
                      <input
                        type="text"
                        id="emergencyContactName"
                        name="emergencyContactName"
                        value={formData.emergencyContactName}
                        onChange={handleChange}
                        required
                        maxLength={100}
                        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        placeholder="Personne à contacter"
                      />
                    </div>
                    <div>
                      <label htmlFor="emergencyContactPhone" className="block text-sm font-medium text-gray-700">
                        Numéro de téléphone de la personne à contacter
                      </label>
                      <input
                        type="tel"
                        id="emergencyContactPhone"
                        name="emergencyContactPhone"
                        value={formData.emergencyContactPhone}
                        onChange={handleChange}
                        required
                        maxLength={20}
                        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        placeholder="Numéro de téléphone"
                      />
                    </div>
                  </div>
                </div>

                {/* Expérience & Formation */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800">3. Expérience & Formation</h2>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="hasSecurityExperience"
                        name="hasSecurityExperience"
                        checked={formData.hasSecurityExperience}
                        onChange={handleChange}
                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                      />
                      <label htmlFor="hasSecurityExperience" className="ml-2 text-sm text-gray-700">
                        Expérience en sécurité
                      </label>
                    </div>
                    {formData.hasSecurityExperience && (
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <label htmlFor="previousEmployer" className="block text-sm font-medium text-gray-700">
                            Dernier employeur
                          </label>
                          <input
                            type="text"
                            id="previousEmployer"
                            name="previousEmployer"
                            value={formData.previousEmployer}
                            onChange={handleChange}
                            maxLength={100}
                            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            placeholder="Dernier employeur"
                          />
                        </div>
                        <div>
                          <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700">
                            Années d'expérience
                          </label>
                          <input
                            type="number"
                            id="yearsOfExperience"
                            name="yearsOfExperience"
                            value={formData.yearsOfExperience}
                            onChange={handleChange}
                            min={0}
                            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            placeholder="Années d'expérience"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastPositionHeld" className="block text-sm font-medium text-gray-700">
                            Dernier poste occupé
                          </label>
                          <input
                            type="text"
                            id="lastPositionHeld"
                            name="lastPositionHeld"
                            value={formData.lastPositionHeld}
                            onChange={handleChange}
                            maxLength={100}
                            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            placeholder="Dernier poste occupé"
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="securityTrainingCompleted"
                        name="securityTrainingCompleted"
                        checked={formData.securityTrainingCompleted}
                        onChange={handleChange}
                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                      />
                      <label htmlFor="securityTrainingCompleted" className="ml-2 text-sm text-gray-700">
                        Formation en sécurité
                      </label>
                    </div>
                    {formData.securityTrainingCompleted && (
                      <div>
                        <label htmlFor="trainingDetails" className="block text-sm font-medium text-gray-700">
                          Détails de la formation
                        </label>
                        <input
                          type="text"
                          id="trainingDetails"
                          name="trainingDetails"
                          value={formData.trainingDetails}
                          onChange={handleChange}
                          maxLength={200}
                          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                          placeholder="Détails de la formation"
                        />
                      </div>
                    )}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="hasSecurityLicense"
                        name="hasSecurityLicense"
                        checked={formData.hasSecurityLicense}
                        onChange={handleChange}
                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                      />
                      <label htmlFor="hasSecurityLicense" className="ml-2 text-sm text-gray-700">
                        Agrément en sécurité privée
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="hasDriverLicense"
                        name="hasDriverLicense"
                        checked={formData.hasDriverLicense}
                        onChange={handleChange}
                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                      />
                      <label htmlFor="hasDriverLicense" className="ml-2 text-sm text-gray-700">
                        Permis de conduire
                      </label>
                    </div>
                    {formData.hasDriverLicense && (
                      <div>
                        <label htmlFor="driverLicenseCategory" className="block text-sm font-medium text-gray-700">
                          Catégorie du permis
                        </label>
                        <select
                          id="driverLicenseCategory"
                          name="driverLicenseCategory"
                          value={formData.driverLicenseCategory}
                          onChange={handleChange}
                          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        >
                          <option value="">Catégorie du permis</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                {/* Compétences & Certifications */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800">4. Compétences & Certifications</h2>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="hasFirstAidSkills"
                        name="hasFirstAidSkills"
                        checked={formData.hasFirstAidSkills}
                        onChange={handleChange}
                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                      />
                      <label htmlFor="hasFirstAidSkills" className="ml-2 text-sm text-gray-700">
                        Premiers secours
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="hasSelfDefenseTraining"
                        name="hasSelfDefenseTraining"
                        checked={formData.hasSelfDefenseTraining}
                        onChange={handleChange}
                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                      />
                      <label htmlFor="hasSelfDefenseTraining" className="ml-2 text-sm text-gray-700">
                        Self-défense
                      </label>
                    </div>
                    <div>
                      <label htmlFor="otherSkillsOrCertifications" className="block text-sm font-medium text-gray-700">
                        Autres compétences ou certifications
                      </label>
                      <input
                        type="text"
                        id="otherSkillsOrCertifications"
                        name="otherSkillsOrCertifications"
                        value={formData.otherSkillsOrCertifications}
                        onChange={handleChange}
                        maxLength={200}
                        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        placeholder="Autres compétences ou certifications"
                      />
                    </div>
                  </div>
                </div>

                {/* Disponibilité & Conditions de Travail */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800">5. Disponibilité & Conditions de Travail</h2>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="availableForNightShifts"
                        name="availableForNightShifts"
                        checked={formData.availableForNightShifts}
                        onChange={handleChange}
                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                      />
                      <label htmlFor="availableForNightShifts" className="ml-2 text-sm text-gray-700">
                        Disponible pour travailler de nuit
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="availableForTravel"
                        name="availableForTravel"
                        checked={formData.availableForTravel}
                        onChange={handleChange}
                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                      />
                      <label htmlFor="availableForTravel" className="ml-2 text-sm text-gray-700">
                        Disponible pour des déplacements
                      </label>
                    </div>
                    <div>
                      <label htmlFor="preferredWorkLocation" className="block text-sm font-medium text-gray-700">
                        Préférence de lieu de travail
                      </label>
                      <select
                        id="preferredWorkLocation"
                        name="preferredWorkLocation"
                        value={formData.preferredWorkLocation}
                        onChange={handleChange}
                        required
                        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      >
                        <option value="">Préférence de lieu de travail</option>
                        <option value="Abidjan">Abidjan</option>
                        <option value="Intérieur du pays">Intérieur du pays</option>
                        <option value="Peu importe">Peu importe</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Documents à Joindre */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800">6. Documents à Joindre</h2>
                  <div className="mt-4">
                    <label htmlFor="attachedDocuments" className="block text-sm font-medium text-gray-700">
                      Sélectionnez les documents à joindre
                    </label>
                    <input type="file" accept=".pdf,.doc,.docx,.xlsx,.xlx" id="attachedDocuments" name="attachedDocuments" multiple onChange={handleFileChange} classname="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                  </div>
                  {/* Afficher les fichiers joints */}
                  {/* Affichage des fichiers joints avec un bouton "Supprimer" */}
                  {formData.attachedDocuments.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-gray-700">Fichiers joints :</h3>
                      <ul className="pl-5 space-y-1 list-disc">
                        {formData.attachedDocuments.map((doc, index) => (
                          <li key={index} className="flex items-center justify-between">
                            <a
                              href={doc.documentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              {doc.documentType.toUpperCase()} - {doc.documentUrl.split("/").pop()}
                            </a>
                            <button
                              type="button"
                              onClick={() => handleDeleteFile(index)}
                              className="ml-4 font-medium text-red-500 hover:text-red-700"
                            >
                              Supprimer
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Déclaration et Signature */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800">7. Déclaration et Signature</h2>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="declaration"
                        name="declaration"
                        checked={formData.declaration}
                        onChange={handleChange}
                        required
                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                      />
                      <label htmlFor="declaration" className="ml-2 text-sm text-gray-700">
                        Je certifie que les informations sont exactes
                      </label>
                    </div>
                    <div>
                      <label htmlFor="signature" className="block text-sm font-medium text-gray-700">
                        Signature (nom complet)
                      </label>
                      <input
                        type="text"
                        id="signature"
                        name="signature"
                        value={formData.signature}
                        onChange={handleChange}
                        required
                        maxLength={100}
                        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        placeholder="Signature (nom complet)"
                      />
                    </div>
                  </div>
                </div>

                {/* Bouton de Soumission */}
                <div>
                  <button
                    type={loading ? "button" : "submit"}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md min-w-96 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    {loading ? "Envois en cours ..." : "Soumettre la candidature"}

                  </button>
                </div>
              </form>
            </section>

            {/* Image Section */}
            {/* <div className="flex items-center justify-center">
              <img src="images/contact-photo.jpg" alt="Contact" className="w-full rounded-lg shadow-md" />
            </div> */}
          </div>
        </section>
      </main>


    </StoreLayout>
  );
};

export default ContactPage;