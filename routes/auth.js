const express = require("express");

const { registerUser } = require("../auth/register");
const { loginUser } = require("../auth/login");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);


module.exports = router;