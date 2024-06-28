const orderService = require("../services/orderService");

// Create order

exports.createOrder = async (req, res) => {
  const { userId, restaurantId, deliveryAddress, cartItems, total } = req.body;

  try {
    const order = await orderService.createOrder(
      userId,
      restaurantId,
      deliveryAddress,
      cartItems,
      total
    );
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Fetch order details

exports.getOrderDetails = async (req, res) => {
  try {
    const orderDetails = await orderService.fetchOrderDetails(
      req.params.orderId
    );
    if (!orderDetails) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(orderDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await orderService.fetchOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.assignDriver = async (req, res) => {
  try {
    const { orderId, driverId } = req.body;
    const updatedOrder = await orderService.assignDriverToOrder(
      orderId,
      driverId
    );
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
