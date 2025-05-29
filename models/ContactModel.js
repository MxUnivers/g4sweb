// models/Contact.js
const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  
  subjet: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: true,
  },
  file: {
    type: String, // URL ou chemin du fichier
  },
  responses: [
    {
      response: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Contact', ContactSchema);