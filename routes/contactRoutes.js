// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/send', contactController.createMessage);
router.get('/messages', contactController.getMessages);
router.post('/reply/:id', contactController.replyToMessage);

module.exports = router;