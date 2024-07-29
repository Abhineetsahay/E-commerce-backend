const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.CreateAccount = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(400).json({
        success: false,
        message: "User Already Created",
      });
    }
    const hashedPassowrd = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      phone,
      email,
      password: hashedPassowrd,
    });
    const payload = {
      id: newUser._id,
      name,
      phone,
    };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "5hr",
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
    await newUser.save();
    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
      message: "Internal Server Error",
    });
  }
};
