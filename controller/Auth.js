const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateJwtToken } = require("../utils/generateJwt");

exports.CreateAccount = async (req, res) => {
  
  try {
    const { name, phone, email, password } = req.body;
    let role = 'user';
    
    if (phone === Number(process.env.ADMIN_PHONE_NUMBER) && email === process.env.ADMIN_EMAIL) {
      role = 'admin'; 
    }
    
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      phone,
      email,
      password: hashedPassword,
      role,
    });

    const { accessToken, refreshToken } = generateJwtToken(newUser);

    await newUser.save();
    return res.status(200).json({
      success: true,
      message: "User created successfully",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while creating account",
      error: error.message,
    });
  }
};
exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Both email and password are required",
      });
    }

    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, findUser.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const { accessToken, refreshToken } = generateJwtToken(findUser);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// const Admin = async (name, password, role) => {
//   try {
//     const adminEmail = process.env.ADMIN_EMAIL;
//     const adminPhone = process.env.ADMIN_PHONE;
//     const findUser = await User.findOne({ adminEmail });
//     if (findUser) {
//       return res.status(400).json({
//         success: false,
//         message: "User already found",
//       });
//     }

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
