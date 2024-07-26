const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ messafe: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token Expired" });
  }
};

module.exports = {
  verifyToken,
};
