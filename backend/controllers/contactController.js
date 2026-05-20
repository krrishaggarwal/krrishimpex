// backend/controllers/contactController.js
const ContactRequest = require("../models/contactRequest");
const { sendEmail } = require("../utils/emailService");

exports.createContact = async (req, res, next) => {
  try {
    const c = await ContactRequest.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      subject: req.body.subject || "General Inquiry",
      message: req.body.message || "",
    });

    // optional admin notification
    try {
      await sendEmail({
        to: process.env.EMAIL_USER,
        subject: `New Contact: ${c.subject} from ${c.name}`,
        text: `Message: ${c.message}\nContact: ${c.email} / ${c.phone}`,
      });
    } catch (e) {
      console.warn("Email send failed", e.message);
    }

    res.status(201).json({ success: true, contact: c });
  } catch (err) {
    next(err);
  }
};

exports.listContacts = async (req, res, next) => {
  try {
    const list = await ContactRequest.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json({ success: true, contacts: list });
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const id = req.params.id;
    const c = await ContactRequest.findByPk(id);
    if (!c) return res.status(404).json({ message: "Not found" });

    const status = req.body.status;
    if (!["pending", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    c.status = status;
    await c.save();
    res.json({ success: true, contact: c });
  } catch (err) {
    next(err);
  }
};

exports.deleteContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    const c = await ContactRequest.findByPk(id);
    if (!c) return res.status(404).json({ message: "Not found" });

    await c.destroy();
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    next(err);
  }
};
