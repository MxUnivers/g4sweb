// controllers/contactController.js
const Contact = require('../models/ContactModel');
const ApplicationInfo = require('../utils/dataApi');
const sendEmail = require('../utils/sendEmail');

// Créer un nouveau message
exports.createMessage = async (req, res) => {
  const { name, email, phone,subjet, message, file } = req.body;

  try {
    const newMessage = new Contact({
      name,
      email,
      subjet,
      phone,
      message,
      file,
    });

    sendEmail(ApplicationInfo.emailApplication,ApplicationInfo.passwordEmail,email,subjet,message);

    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully', data:newMessage });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
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

    sendEmail(ApplicationInfo.emailApplication,ApplicationInfo.passwordEmail,message.email,"Nouveau message envoyé : ",message.message);

    res.status(200).json({ message: 'Reponse envoyé avec succès', data:message });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};