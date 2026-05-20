// backend/models/contactRequest.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const ContactRequest = sequelize.define(
  "ContactRequest",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
    },
    subject: {
      type: DataTypes.ENUM(
        "General Inquiry",
        "Get Quotation",
        "Product Information",
        "Order Inquiry",
        "Customer Support"
      ),
      defaultValue: "General Inquiry",
    },
    message: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM("pending", "completed"),
      defaultValue: "pending",
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
    tableName: "contact_requests", // optional: specify table name
  }
);

module.exports = ContactRequest;
