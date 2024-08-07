const express = require("express");
const { getProduct } = require("../controller/Product");

const router=express.Router();

// router.post("/CreateAccount",CreateAccount);
router.get("/fetchProductData",getProduct);

module.exports = router;