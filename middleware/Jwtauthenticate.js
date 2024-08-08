const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authenticateToken = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer")) {
    return res.status(401).json({
      success: false,
      message: "No token provided or token format is incorrect",
    });
  }
  const token = header.split(" ")[1];
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    req.user = decoded; 
    console.log();
    
    next();
  });
};
