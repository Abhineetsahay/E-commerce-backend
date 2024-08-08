const express = require("express");
const { getProduct, AddProduct } = require("../controller/Product");
const { authenticateToken } = require("../middleware/Jwtauthenticate");

const router=express.Router();

router.get("/fetchProductData",getProduct);
router.post("/addProduct",authenticateToken,AddProduct);

module.exports = router;