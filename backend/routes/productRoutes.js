// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productController');
const upload = require('../utils/upload');

// Public endpoints
router.get('/', productCtrl.displayProducts);
router.post('/', upload.single('image'), productCtrl.addProduct); // optionally public; restrict if needed
router.put('/:id', upload.single('image'), productCtrl.updateProduct);
router.delete('/:id', productCtrl.deleteProduct);
router.get('/:id', productCtrl.getProductById);

module.exports = router;
