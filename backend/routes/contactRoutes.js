// backend/routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const contactCtrl = require('../controllers/contactController');

router.post('/', contactCtrl.createContact);

module.exports = router;
