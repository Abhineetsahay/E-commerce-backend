const express = require("express");
const { authenticateToken } = require("../middleware/Jwtauthenticate");
const { addCartItem, removeCartItem } = require("../controller/CartController");

const router=express.Router();


router.post("/addCart",authenticateToken,addCartItem)
router.delete("/deleteCartItem",authenticateToken,removeCartItem);

module.exports = router;