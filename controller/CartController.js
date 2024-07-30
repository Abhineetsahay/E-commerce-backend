const UserCart = require("../models/Cart");

exports.addCartItem = async (req, res) => {
  try {
    const { name, phone } = req.user;
    const { id, description, price, title } = req.body;

    if (!description || !id || !price || !title) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find the user by name and phone
    let user = await UserCart.findOne({ name, phone });
    if (!user) {
      user = await UserCart.create({ name, phone, cart: [] });
    }

    let itemFound = user.cart.find((item) => item.id === id);

    if (itemFound) {
      itemFound.Quantity++;
    } else {
      user.cart.push({ id, description, price, title, quantity: 1 });
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Item Added Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error while adding cart Item",
    });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const { name, phone } = req.user;
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id required",
      });
    }
    const user = await UserCart.findOne({ phone });
    if (!user) {
      return res.status(404).json({
        success: true,
        message: "User not available",
      });
    }
    const index = user.cart.findIndex((item) => item.id == id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    user.cart.splice(index, 1);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Item removed successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error while removing cart Item",
    });
  }
};
