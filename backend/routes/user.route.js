const express = require("express");
const router = express.Router();
const authController = require("../controller/user.controller.js");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

module.exports = router;
