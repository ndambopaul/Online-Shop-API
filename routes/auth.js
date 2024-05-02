const express = require("express");

const { registerUser } = require("../auth/register");
const { loginUser } = require("../auth/login");
const { forgotPassword } = require("../auth/forgot_password");
const { resetPassword } = require("../auth/reset_password");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);


module.exports = router;