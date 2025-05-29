const mongooseClient = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const XLSX = require("xlsx");
const path = require("path");
const AdminModel = require("./models/AdminModel");


dotenv.config();

const url = process.env.MONGO_URI;

mongooseClient.set('strictQuery', false);

const connectDB = async () => {
  try {
    await mongooseClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connexion à la base de données réussie");
  } catch (error) {
    console.error("Connexion à la base de données refusée", error);
    // process.exit(1); // Arrête le processus en cas d'échec
  }
};

// Fonctions d'initialisation


const createDefaultAdmins = async () => {
  try {
    // Vérifier si des administrateurs existent déjà
    const adminCount = await AdminModel.countDocuments();
    if (adminCount > 0) {
      console.log('Admins already exist. Skipping default admin creation.');
      return;
    }

    // Liste des administrateurs par défaut
    const defaultAdmins = [
      { email: 'admin1@example.com', password: 'password123' },
      { email: 'admin2@example.com', password: 'password456' },
      { email: 'admin3@example.com', password: 'password789' },
    ];

    // Créer les administrateurs par défaut
    for (const adminData of defaultAdmins) {
      const newAdmin = new AdminModel(adminData);
      await newAdmin.save();
      console.log(`Compt créer : ${newAdmin.email}`);
    }

    console.log('les comptes adminstrateurs ont été bien créer');
  } catch (error) {
    console.error('Errueur lors de la créer des comptes admnistrateurs:', error);
  }
};



// Fonction principale pour initialiser toutes les données
async function initializeData() {
  try {
    await connectDB();
    await createDefaultAdmins();

    //console.log('Données initialisées avec succès.');
  } catch (error) {
    console.error('Erreur lors de l’initialisation des données :', error);
  }
}

initializeData();

module.exports = connectDB;
