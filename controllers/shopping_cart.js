const ShoppingCart = require("../models/shoppingCart");
const Product = require("../models/product");

const AddCartItem = async(req, res) => {
    const { productId, quantity } = req.body
    
    try{
        const user = req.user
        const product = await Product.findById({"_id": productId})

        if(!product){
            return res.send({"error": `No product with id: ${productId}`}).status(404)
        }
        const total_price = product.price * quantity
        const newCartItem = new ShoppingCart({
            user: user.id,
            product: productId,
            product_name: product.name,
            quantity: quantity,
            unit_price: product.price,
            total_price: total_price
        });

        product.stock_quantity -= quantity
        await product.save()

        const cartItem = await newCartItem.save()
        res.send({"user": user, "item": cartItem}).status(201)

    } catch(error) {
        console.log(error);
        return res.send({"message": "Internal Server Error"}).status(500)
    }
};

const getCartItems = async(req, res) => {
    const cartItems = await ShoppingCart.find({user: req.user.id});
    res.send(cartItems).status(200)
};

module.exports = {
    AddCartItem,
    getCartItems
}