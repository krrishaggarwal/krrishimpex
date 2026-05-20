// backend/models/quotationRequest.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const QuotationRequest = sequelize.define(
  "QuotationRequest",
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
    product_name: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.STRING,
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
    tableName: "quotation_requests", // optional: specify table name
  }
);

module.exports = QuotationRequest;
