const jwt = require("jsonwebtoken");

exports.generateJwtToken = (user) => {
  const payload = {
    id:user._id,
    name:user.name,
    phone:user.phone,
  };
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "5hr",
  });

  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return {accessToken,refreshToken};
};
