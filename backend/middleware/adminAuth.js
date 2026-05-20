const crypto = require("crypto");

const TOKEN_TTL_MS = 8 * 60 * 60 * 1000;

const getSecret = () =>
  process.env.ADMIN_TOKEN_SECRET || process.env.ADMIN_PASSWORD || "change-this-admin-secret";

const signPayload = (payload) =>
  crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");

const createAdminToken = () => {
  const payload = Buffer.from(
    JSON.stringify({ role: "admin", exp: Date.now() + TOKEN_TTL_MS })
  ).toString("base64url");
  return `${payload}.${signPayload(payload)}`;
};

const verifyAdminToken = (token) => {
  if (!token || !token.includes(".")) return false;

  const [payload, signature] = token.split(".");
  const expected = signPayload(payload);

  if (
    signature.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  ) {
    return false;
  }

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return data.role === "admin" && data.exp > Date.now();
  } catch {
    return false;
  }
};

const requireAdmin = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";

  if (!verifyAdminToken(token)) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  next();
};

module.exports = { createAdminToken, requireAdmin };
