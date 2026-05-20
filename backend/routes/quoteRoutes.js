// backend/routes/quoteRoutes.js
const express = require('express');
const router = express.Router();
const quotationCtrl = require('../controllers/quotationController');

// public create
router.post('/', quotationCtrl.createQuotation);

// admin endpoints are in adminRoutes (list/update/delete)
module.exports = router;
