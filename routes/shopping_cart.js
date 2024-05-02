const express = require("express");
const { AddCartItem, getCartItems } = require("../controllers/shopping_cart");

const router = express.Router();

router.get("/", getCartItems);
router.post("/", AddCartItem);

module.exports = router;