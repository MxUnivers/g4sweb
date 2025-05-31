// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/send', contactController.createApplication);
router.get('/messages', contactController.getApplications);
router.post('/reply/:id', contactController.replyToApplication);

module.exports = router;