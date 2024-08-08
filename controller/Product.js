const productSchema = require("../models/Product");

exports.getProduct = async (req, res) => {
  try {
    const products = await productSchema.find({});
    return res.status(200).json({
      success: true,
      message: "Product Fetched Successfully",
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.AddProduct = async (req, res) => {
  try {
    const userRole = req.user.role;
    
    if (userRole !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only admins can add products.",
      });
    }
    const { id, description, price, title, image } = req.body;

    if (!(await productSchema.find({ id }))) {
      return res.status(208).json({
        success: false,
        message: "Item already Added",
      });
    }
    await productSchema.create({ id, description, price, title, image });
    return res.status(200).json({
      success: true,
      message: "Product added Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
