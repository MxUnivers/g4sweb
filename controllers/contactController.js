// controllers/contactController.js
const Contact = require("../models/ContactModel");
const ApplicationInfo = require('../utils/dataApi');
const sendEmail = require('../utils/sendEmail');

// Fonction utilitaire pour valider l'email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Créer une nouvelle candidature
exports.createApplication = async (req, res) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    placeOfBirth,
    nationality,
    gender,
    maritalStatus,
    numberOfChildren,
    currentAddress,
    phone,
    email,
    emergencyContactName,
    emergencyContactPhone,
    hasSecurityExperience,
    previousEmployer,
    yearsOfExperience,
    lastPositionHeld,
    securityTrainingCompleted,
    trainingDetails,
    hasSecurityLicense,
    hasDriverLicense,
    driverLicenseCategory,
    hasFirstAidSkills,
    hasSelfDefenseTraining,
    otherSkillsOrCertifications,
    availableForNightShifts,
    availableForTravel,
    preferredWorkLocation,
    attachedDocuments,
    declaration,
    signature,
  } = req.body;

  try {
    // Validation des champs obligatoires
    if (!firstName || !lastName || !dateOfBirth || !placeOfBirth || !nationality || !gender || !maritalStatus || !currentAddress || !phone || !email || !emergencyContactName || !emergencyContactPhone || declaration === undefined) {
      return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis." });
    }

    if (firstName.length > 100) {
      return res.status(400).json({ message: "Le nom ne doit pas dépasser 100 caractères." });
    }
    if (lastName.length > 100) {
      return res.status(400).json({ message: "Le prénom ne doit pas dépasser 100 caractères." });
    }

    if (placeOfBirth.length > 100) {
      return res.status(400).json({ message: "Le lieu de naissance ne doit pas dépasser 100 caractères." });
    }

    if (email.length > 150 || !validateEmail(email)) {
      return res.status(400).json({ message: "L'email est invalide ou dépasse 150 caractères." });
    }

    if (phone.length > 20) {
      return res.status(400).json({ message: "Le téléphone ne doit pas dépasser 20 caractères." });
    }

    if (emergencyContactPhone.length > 20) {
      return res.status(400).json({ message: "Le téléphone de la personne à contacter ne doit pas dépasser 20 caractères." });
    }

    if (!declaration) {
      return res.status(400).json({ message: "Vous devez accepter la déclaration pour soumettre votre candidature." });
    }

    // Création de la candidature
    const newApplication = new Contact({
      firstName,
      lastName,
      dateOfBirth,
      placeOfBirth,
      nationality,
      gender,
      maritalStatus,
      numberOfChildren,
      currentAddress,
      phone,
      email,
      emergencyContactName,
      emergencyContactPhone,
      hasSecurityExperience,
      previousEmployer,
      yearsOfExperience,
      lastPositionHeld,
      securityTrainingCompleted,
      trainingDetails,
      hasSecurityLicense,
      hasDriverLicense,
      driverLicenseCategory,
      hasFirstAidSkills,
      hasSelfDefenseTraining,
      otherSkillsOrCertifications,
      availableForNightShifts,
      availableForTravel,
      preferredWorkLocation,
      attachedDocuments: 
      declaration,
      signature,
    });

    // Envoi des emails
    sendEmail(
      ApplicationInfo.emailApplication,
      ApplicationInfo.passwordEmail,
      "fatihoune.dev@gmail.com",
      "Nouvelle candidature reçue",
      `Une nouvelle candidature a été soumise par ${firstName} ${lastName}.`
    );

    // Envoi des emails
    sendEmail(
      ApplicationInfo.emailApplication,
      ApplicationInfo.passwordEmail,
      ApplicationInfo.emailApplication,
      "Nouvelle candidature reçue",
      `Une nouvelle candidature a été soumise par ${firstName} ${lastName}.`
    );

    await newApplication.save();

    res.status(201).json({ message: "Candidature soumise avec succès", data: newApplication });
  } catch (error) {
    console.error("Erreur lors de la création de la candidature :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Lister les candidatures avec filtres
exports.getApplications = async (req, res) => {
  const { email, phone } = req.query;

  const query = {};
  if (email) query.email = email;
  if (phone) query.phone = phone;

  try {
    const applications = await Contact.find(query).sort({ createdAt: -1 });
    res.status(200).json({ data: applications });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

// Répondre à une candidature
exports.replyToApplication = async (req, res) => {
  const { id } = req.params;
  const { response } = req.body;

  try {
    const application = await Contact.findById(id);
    if (!application) return res.status(404).json({ message: 'Candidature non trouvée' });

    application.responses.push({ response });
    await application.save();

    sendEmail(
      ApplicationInfo.emailApplication,
      ApplicationInfo.passwordEmail,
      application.email,
      "Réponse à votre candidature",
      response
    );

    res.status(200).json({ message: 'Réponse envoyée avec succès', data: application });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};