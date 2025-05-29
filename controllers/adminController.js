// controllers/adminController.js
const Admin = require('../models/AdminModel');
const jwt = require('jsonwebtoken'); // Importez le package jsonwebtoken

// Fonction pour générer un token JWT
const generateToken = (adminId) => {
  return jwt.sign(
    { id: adminId }, // Données à inclure dans le token (ID de l'admin)
    process.env.JWT_SECRET, // Clé secrète pour signer le token (à définir dans vos variables d'environnement)
    { expiresIn: '1h' } // Durée de validité du token (par exemple, 1 heure)
  );
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Recherche de l'administrateur par email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Compte non trouvé avec cet email' });
    }

    // Comparaison du mot de passe
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    // Génération du token JWT
    const token = generateToken(admin._id);

    // Réponse avec le token et les données de l'administrateur
    res.status(200).json({
      message: 'Connexion réussie',
      token, // Inclure le token dans la réponse
      data: admin,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};