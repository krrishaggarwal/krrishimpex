require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");
const { Op } = require("sequelize");
const { sequelize } = require("./config/db"); // Sequelize connection
const Product = require("./models/product");
const QuotationRequest = require("./models/quotationRequest");
const ContactRequest = require("./models/contactRequest");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const quoteRoutes = require("./routes/quoteRoutes");
const contactRoutes = require("./routes/contactRoutes");
const errorMiddleware = require("./middleware/errorMiddleware2");
const cron = require("node-cron");

const app = express();
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));
app.use("/api/admin/login", rateLimit({ windowMs: 15 * 60 * 1000, max: 10 }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/contacts", contactRoutes);

// health check
app.get("/", (req, res) => res.send("API running"));

// error handler
app.use(errorMiddleware);

// Start server and connect to MySQL via Sequelize
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL Connected via Sequelize");

    // Sync all models (creates tables if not exist)
    await sequelize.sync();
    console.log("✅ All models synced");

    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Unable to connect to DB:", err);
    process.exit(1);
  }
})();

// CLEANUP: delete quotations & contacts older than 7 days — daily at 02:00
cron.schedule("0 2 * * *", async () => {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const deletedQuotes = await QuotationRequest.destroy({
      where: { createdAt: { [Op.lt]: sevenDaysAgo } },
    });

    const deletedContacts = await ContactRequest.destroy({
      where: { createdAt: { [Op.lt]: sevenDaysAgo } },
    });

    console.log(`Cleanup done. Quotes deleted: ${deletedQuotes}, Contacts deleted: ${deletedContacts}`);
  } catch (e) {
    console.error("Cleanup failed", e);
  }
});
