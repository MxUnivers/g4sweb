const cron = require('node-cron');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const hcaptcha =  require("hcaptcha")
dotenv.config();
const connectDB = require('./database');
const app = express();
// const port = process.env.PORT || 1000;
const port = process.env.PORT || 1000;
// middlwares de l'application
app.use(cors({ origin: "*" }));
app.use(morgan('common'));
app.use(express.json({ limit: "5mb" }));
//app.use(express.urlencoded({ limit: "500mb" }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({
  limit: '10mb',
  extended: true,
}));
app.use(helmet());
// 4. Attaques par déni de service (DoS)
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10000, // Limite à 100 requêtes
});
app.use(limiter);
// access control
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST , PUT, DELETE, PATHCH');
  res.setHeader('Authorization', 'Bearer 3Jxd8uwrY3Jxd8uwrY3uZ96rGSSU8d477BS7h7yAi3uZ963Jxd8uwrY3uZ96rGSSU8d477BS7h7yAirGSSU8d477BS7h7yAi');
  next();
})
// Import des routes
const authenticateToken = require('./middlewares/atuh');
const sendEmail = require('./utils/sendEmail');
const ApplicationInfo = require('./utils/dataApi');
const { default: axios } = require('axios');
// Route de test pour vérifier que le serveur fonctionne
app.get("/", authenticateToken, (req, res) => {
  sendEmail(ApplicationInfo.emailApplication, ApplicationInfo.passwordEmail, "aymarbly559@gmail.com", "Quelqu'un a lancé l'api de application e-commerce",
    "testemail@gmail.com");
  res.json({ message: "API Ecommerce availability" });
});

// Routes
const adminRoutes = require('./routes/adminRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Routes
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/contacts', contactRoutes);

// Connectez-vous à MongoDB et démarrez le serveur
connectDB().then(() => {
  app.listen(port, "0.0.0.0", () => {
    console.log(`Démarrage du serveur sur le port ${port}`);
  });
}).catch(error => {
  console.error('Impossible de connecter la base de données:', error);
});