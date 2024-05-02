const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    unit_price: Number,
    quantity_purchased: Number
});

module.exports = mongoose.model("OrderItem", OrderItemSchema);