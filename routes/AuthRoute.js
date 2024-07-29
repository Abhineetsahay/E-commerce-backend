const express = require("express");
const { CreateAccount } = require("../controller/Auth");

const router=express.Router();

router.post("/CreateAccount",CreateAccount);


module.exports = router;