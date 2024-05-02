const mongoose = require('mongoose');

/*
Product name
Description
price
category
stock quantity
*/ 

const ProductSchema = new mongoose.Schema({
    name : String,
    description : {
        type: String,
        maxLength: 1000,
        minLength: 3
    },
    price : Number,
    category : String,
    stock_quantity : Number,
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', ProductSchema);