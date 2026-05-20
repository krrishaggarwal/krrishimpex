// backend/models/product.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Product = sequelize.define(
  "Product",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING, // store image URL or path
    },
    category: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    sizes: {
      type: DataTypes.JSON, // store array as JSON
      defaultValue: [],
    },
    material: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    packing: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
    tableName: "products", // optional, specify table name
  }
);

module.exports = Product;
