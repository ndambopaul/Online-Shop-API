const ShoppingCart = require("../models/shoppingCart");
const Order = require("../models/order");
const OrderItem = require("../models/OrderItem");

const getOrders = async(req, res) => {
  const orders = await Order.find({user: req.user.id});
  return res.send({"count": orders.length, "orders": orders}).status(200);
};

const getOrderById = async(req, res) => {
  const { id } = req.params
  const order = await Order.findById({"_id": id});

  if(!order) {
    return res.send({"message": `Order with id: ${id} not found!!`}).status(404)
  }
  res.send(order).status(200)
}

const placeOrder = async (req, res) => {
  const { action } = req.body;
  if (action === "place_order") {
    try {
      const cartItems = await ShoppingCart.find({ user: req.user.id });
      if (cartItems.length <= 0) {
        return res.send({"error": "You cannot place an empty order"}).status(400)
      }
      
      let orderTotal = 0;
      for (const item of cartItems) {
        const orderItem = new OrderItem({
          product: item.product,
          unit_price: item.unit_price,
          quantity_purchased: item.quantity,
        });
        await orderItem.save();
        orderTotal += item.total_price;
      }

      const orderObject = {
        user: req.user.id,
        total_cost: orderTotal,
      };

      const order = await Order.create(orderObject);

      await ShoppingCart.deleteMany({ user: req.user.id });
      res
        .send({ message: `Order id: ${order.id} successfully placed` })
        .status(201);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ message: `Internal Server Error: ${error.message}` });
    }
  } else {
    return res.send({ message: "Place the order later" }).status(200);
  }
};

module.exports = {
  placeOrder,
  getOrders,
  getOrderById
};
