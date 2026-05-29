// backend/controllers/productController.js
const Product = require("../models/product");
const fs = require("fs");
const path = require("path");

const getUploadPath = (imagePath) =>
  path.join(__dirname, "..", imagePath.replace(/^\/+/, ""));

// ✅ UNIVERSAL SIZE PARSER
const parseSizes = (sizes) => {
  if (!sizes) return [];

  // If already array
  if (Array.isArray(sizes)) {
    return sizes.map(s => s.toString().replace(/"/g, "").trim());
  }

  // If JSON string
  if (typeof sizes === "string") {
    const trimmed = sizes.trim();

    try {
      if (trimmed.startsWith("[")) {
        const parsed = JSON.parse(trimmed);
        return parsed.map(s => s.toString().replace(/"/g, "").trim());
      }
    } catch (e) { }

    // If comma separated
    return trimmed
      .split(",")
      .map((s) => s.replace(/"/g, "").trim())
      .filter(Boolean);
  }

  return [];
};

// ✅ ADD PRODUCT
exports.addProduct = async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      sizes: parseSizes(req.body.sizes), // ✅ FIXED
      material: req.body.material,
      quantity: req.body.quantity,
      packing: req.body.packing,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    };

    const product = await Product.create(payload);
    res.status(201).json({ success: true, product });
  } catch (err) {
    next(err);
  }
};

// ✅ DELETE PRODUCT
exports.deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    // delete image file if exists
    if (product.image) {
      const filePath = getUploadPath(product.image);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await product.destroy();
    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    next(err);
  }
};

// ✅ UPDATE PRODUCT
exports.updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    // Replace image if new uploaded
    if (req.file && product.image) {
      const oldPath = getUploadPath(product.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      product.image = `/uploads/${req.file.filename}`;
    }

    const fields = [
      "name",
      "category",
      "description",
      "sizes",
      "material",
      "quantity",
      "packing",
    ];

    fields.forEach((f) => {
      if (req.body[f] !== undefined) {
        if (f === "sizes") {
          product.sizes = parseSizes(req.body.sizes); // ✅ FIXED
        } else {
          product[f] = req.body[f];
        }
      }
    });

    await product.save();

    res.json({ success: true, product });
  } catch (err) {
    next(err);
  }
};

// ✅ GET ALL PRODUCTS
exports.displayProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json({ success: true, products });
  } catch (err) {
    next(err);
  }
};

// ✅ GET PRODUCT BY ID
exports.getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (err) {
    next(err);
  }
};
