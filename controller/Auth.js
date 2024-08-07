const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateJwtToken } = require("../utils/generateJwt");

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

    const { accessToken, refreshToken } = generateJwtToken(newUser);

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
      message: "Error while creating Account",
    });
  }
};

exports.Login = async (req, res) => {
  try {
    const { password, email } = req.body;
    if (!password || !email) {
      return res.status(400).json({
        success: "false",
        message: "Require Both password and email",
      });
    }
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(404).status({
        success: "false",
        message: "User Not found",
      });
    }
    if (await bcrypt.compare(password, findUser.password)) {
      const { accessToken, refreshToken } = generateJwtToken(findUser);
      return res.status(200).json({
        success: true,
        message: "login successfully",
        accessToken,
        refreshToken
      });
    }
    else{
      return res.status(403).json({
        success:false,
        message:"Password is incorect"
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
      message: "Internal Server Error",
    });
  }
};
