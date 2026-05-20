// backend/routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const productCtrl = require("../controllers/productController");
const quotationCtrl = require("../controllers/quotationController");
const contactCtrl = require("../controllers/contactController");
const adminAuthCtrl = require("../controllers/adminAuthController");
const { requireAdmin } = require("../middleware/adminAuth");
const upload = require("../utils/upload");

router.post("/login", adminAuthCtrl.login);

router.use(requireAdmin);

router.get("/products", productCtrl.displayProducts);
router.post("/products", upload.single("image"), productCtrl.addProduct);
router.put("/products/:id", upload.single("image"), productCtrl.updateProduct);
router.delete("/products/:id", productCtrl.deleteProduct);

router.get("/quotations", quotationCtrl.listQuotations);
router.put("/quotations/:id/status", quotationCtrl.updateStatus);
router.delete("/quotations/:id", quotationCtrl.deleteQuotation);

router.get("/contacts", contactCtrl.listContacts);
router.put("/contacts/:id/status", contactCtrl.updateStatus);
router.delete("/contacts/:id", contactCtrl.deleteContact);

module.exports = router;
