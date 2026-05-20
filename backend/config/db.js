// backend/config/db.js
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE, // database name
  process.env.MYSQL_USER,     // username
  process.env.MYSQL_PASSWORD, // password
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    logging: process.env.NODE_ENV !== "production",
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database Connected with Sequelize");
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
