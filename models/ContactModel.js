// models/Contact.js
const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema(
  {
    // 1. Informations Personnelles
    firstName: { type: String, required: true, maxlength: 100 },
    lastName: { type: String, required: true, maxlength: 100 },
    dateOfBirth: { type: Date, required: true },
    placeOfBirth: { type: String, required: true, maxlength: 100 },
    nationality: { type: String, required: true, maxlength: 50 },
    gender: { type: String, enum: ['Homme', 'Femme'], required: true },
    maritalStatus: {
      type: String,
      enum: ['Célibataire', 'Marié(e)', 'Autre'],
      required: true,
    },
    numberOfChildren: { type: Number, default: 0 },

    // 2. Coordonnées
    currentAddress: { type: String, required: true, maxlength: 200 },
    phone: { type: String, required: true, maxlength: 20 },
    email: { type: String, required: true, trim: true, maxlength: 150 },
    emergencyContactName: { type: String, required: true, maxlength: 100 },
    emergencyContactPhone: { type: String, required: true, maxlength: 20 },

    // 3. Expérience & Formation
    hasSecurityExperience: { type: Boolean, required: true },
    previousEmployer: { type: String, maxlength: 100 },
    yearsOfExperience: { type: Number },
    lastPositionHeld: { type: String, maxlength: 100 },
    securityTrainingCompleted: { type: Boolean, required: true },
    trainingDetails: { type: String, maxlength: 200 },
    hasSecurityLicense: { type: Boolean, required: true },
    hasDriverLicense: { type: Boolean, required: true },
    driverLicenseCategory: { type: String,},

    // 4. Compétences & Certifications
    hasFirstAidSkills: { type: Boolean, required: false },
    hasSelfDefenseTraining: { type: Boolean, required: false },
    otherSkillsOrCertifications: { type: String, maxlength: 200 },

    // 5. Disponibilité & Conditions de Travail
    availableForNightShifts: { type: Boolean, required: false },
    availableForTravel: { type: Boolean, required: false },
    preferredWorkLocation: {
      type: String,
      // enum: ['Abidjan', 'Intérieur du pays', 'Peu importe'],
      required: true,
    },

    // 6. Documents à Joindre
    attachedDocuments: [
      {
        documentType: { type: String, },
        documentUrl: { type: String }, // URL ou chemin du fichier
      },
    ],

    // 7. Déclaration et Signature
    declaration: { type: Boolean, required: true },
    signature: { type: String, maxlength: 100 }, // Nom de la personne signataire
    submissionDate: { type: Date, default: Date.now },

    // Réponses (si applicables)
    responses: [
      {
        response: { type: String, maxlength: 500 },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', ContactSchema);