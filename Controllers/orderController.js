// controllers/orderController.js
const { OrdersModel } = require("../models/OrdersModel");

async function newOrder(req, res) {
  const { userId } = req; // Assuming you have userId from authentication middleware
  const { stockId, quantity } = req.body;

  try {
    // Fetch all orders by the user for the specific stock
    const userOrders = await OrdersModel.find({ userId, stockId });

    // Calculate total quantity of stocks the user has bought
    const totalBought = userOrders.reduce((total, order) => total + order.quantity, 0);

    // Check if the user has enough stock to sell
    if (totalBought < quantity) {
      return res.status(400).json({ message: "Not enough stock to sell." });
    }

    // If the user has enough stock, create a new order
    const newOrder = await OrdersModel.create({ userId, stockId, quantity });
    return res.status(201).json(newOrder);
  } catch (error) {
    return res.status(500).json({ message: "Server error.", error });
  }
}

// Export the newOrder function along with other controller functions if needed
module.exports = {
  newOrder,
  // other functions can be exported here
};
