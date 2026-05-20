// backend/controllers/quotationController.js
const QuotationRequest = require("../models/quotationRequest");
const { sendEmail } = require("../utils/emailService");

// create quotation request (public)
exports.createQuotation = async (req, res, next) => {
  try {
    const q = await QuotationRequest.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      product_name: req.body.product_name || "",
      quantity: req.body.quantity || "",
      message: req.body.message || "",
    });

    // optionally send notification email to admin
    try {
      await sendEmail({
        to: process.env.EMAIL_USER,
        subject: `New Quotation Request from ${q.name}`,
        text: `Product: ${q.product_name}\nQuantity: ${q.quantity}\nMsg: ${q.message}\nContact: ${q.email} / ${q.phone}`,
      });
    } catch (e) {
      console.warn("Email send failed", e.message);
    }

    res.status(201).json({ success: true, quote: q });
  } catch (err) {
    next(err);
  }
};

// list (admin)
exports.listQuotations = async (req, res, next) => {
  try {
    const q = await QuotationRequest.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json({ success: true, quotations: q });
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const id = req.params.id;
    const q = await QuotationRequest.findByPk(id);
    if (!q) return res.status(404).json({ message: "Not found" });

    const status = req.body.status;
    if (!["pending", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    q.status = status;
    await q.save();
    res.json({ success: true, quotation: q });
  } catch (err) {
    next(err);
  }
};

exports.deleteQuotation = async (req, res, next) => {
  try {
    const id = req.params.id;
    const q = await QuotationRequest.findByPk(id);
    if (!q) return res.status(404).json({ message: "Not found" });

    await q.destroy();
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    next(err);
  }
};
