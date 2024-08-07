const express = require("express");
const { CreateAccount, Login } = require("../controller/Auth");

const router=express.Router();

router.post("/CreateAccount",CreateAccount);
router.post("/Login",Login);

module.exports = router;