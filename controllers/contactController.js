// controllers/contactController.js
const Contact = require('../models/ContactModel');
const ApplicationInfo = require('../utils/dataApi.js');
const sendEmail = require('../utils/sendEmail');


// Fonction utilitaire pour valider l'email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Créer un nouveau message
exports.createMessage = async (req, res) => {
  const { name, email, phone, subjet, message } = req.body;

  try {
    // Validation des champs
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis." });
    }

    if (name.length > 100) {
      return res.status(400).json({ message: "Le nom ne doit pas dépasser 100 caractères." });
    }

    if (email.length > 150 || !validateEmail(email)) {
      return res.status(400).json({ message: "L'email est invalide ou dépasse 150 caractères." });
    }

    if (phone && phone.length > 20) {
      return res.status(400).json({ message: "Le téléphone ne doit pas dépasser 20 caractères." });
    }

    if (subjet && subjet.length > 100) {
      return res.status(400).json({ message: "Le sujet ne doit pas dépasser 100 caractères." });
    }

    if (message.length > 500) {
      return res.status(400).json({ message: "Le message ne doit pas dépasser 500 caractères." });
    }

    // Création du nouveau message
    const newMessage = new Contact({
      name,
      email,
      subjet,
      phone,
      message,
      file: req.file ? req.file.path : null, // Si vous gérez des fichiers uploadés
    });

    // Envoi des emails
    sendEmail(
      ApplicationInfo.emailApplication,
      ApplicationInfo.passwordEmail,
      "fatihoune.dev@gmail.com",
      subjet,
      message
    );
    sendEmail(
      ApplicationInfo.emailApplication,
      ApplicationInfo.passwordEmail,
      ApplicationInfo.emailApplication,
      subjet,
      message
    );

    // Sauvegarde du message dans la base de données
    await newMessage.save();

    res.status(201).json({ message: "Message envoyé avec succès", data: newMessage });
  } catch (error) {
    console.error("Erreur lors de la création du message :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};



// Lister les messages avec filtres
exports.getMessages = async (req, res) => {
  const { email, phone, postalCode } = req.query;

  const query = {};
  if (email) query.email = email;
  if (phone) query.phone = phone;

  try {
    const messages = await Contact.find(query).sort({createdAt:-1});
    console.log(messages)
    res.status(200).json({data: messages });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Répondre à un message
exports.replyToMessage = async (req, res) => {
  const { id } = req.params;
  const { response } = req.body;

  try {
    const message = await Contact.findById(id);
    if (!message) return res.status(404).json({ message: 'Message not found' });

    message.responses.push({ response });
    await message.save();

    sendEmail(ApplicationInfo.emailApplication,ApplicationInfo.passwordEmail,message.email,"Réponse de G4S",message.message);

    res.status(200).json({ message: 'Reponse envoyé avec succès', data:message });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};