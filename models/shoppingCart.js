const mongoose = require("mongoose");

const ShoppingCartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    product_name: String,
    quantity: {
        type: Number,
        minValue: 1
    },
    unit_price: {
        type: Number,
        default: 0
    },
    total_price: Number,
    purchase_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ShoppingCart', ShoppingCartSchema);
