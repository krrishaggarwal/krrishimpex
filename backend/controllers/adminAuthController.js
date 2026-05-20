const { createAdminToken } = require("../middleware/adminAuth");

exports.login = (req, res) => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const { email, password } = req.body;

  if (!adminEmail || !adminPassword) {
    return res.status(500).json({
      success: false,
      message: "Admin credentials are not configured",
    });
  }

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  res.json({ success: true, token: createAdminToken() });
};
