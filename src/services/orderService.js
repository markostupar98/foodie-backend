const { PrismaClient } = require("@prisma/client");
const { sendPushNotification } = require("./notificationService");
const prisma = new PrismaClient();

// Create order

exports.createOrder = async (
  userId,
  restaurantId,
  deliveryAddress,
  cartItems,
  total
) => {
  const order = await prisma.order.create({
    data: {
      userId,
      restaurantId,
      deliveryAddress,
      total,
      status: "pending",
      driverId: null,
      orderItems: {
        create: cartItems.map((item) => ({
          dishId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
  });

  // Fetch drivers' notification tokens
  const drivers = await prisma.driver.findMany({
    select: { notificationToken: true },
  });

  const notificationPromises = drivers.map(async (driver) => {
    if (driver.notificationToken) {
      try {
        await sendPushNotification(
          driver.notificationToken,
          "Nova narudžba je kreirana!"
        );
      } catch (error) {
        console.error(
          `Failed to send notification to driver with token: ${driver.notificationToken}`,
          error
        );
      }
    }
  });

  await Promise.all(notificationPromises);

  return order;
};

// Assign driver to order and send notification to use
exports.assignDriverToOrder = async (orderId, driverId) => {
  const updatedOrder = await prisma.order.update({
    where: { id: parseInt(orderId) },
    data: {
      driverId: parseInt(driverId),
      status: "delivering",
    },
  });

  // Fetch user notification token
  const order = await prisma.order.findUnique({
    where: { id: parseInt(orderId) },
    include: { user: true },
  });

  if (order && order.user && order.user.notificationToken) {
    const userNotificationToken = order.user.notificationToken;
    try {
      await sendPushNotification(
        userNotificationToken,
        "Vaša narudžba je preuzeta!"
      );
    } catch (error) {
      console.error(
        `Failed to send notification to user with token: ${userNotificationToken}`,
        error
      );
    }
  }

  return updatedOrder;
};
// Fetch order details

exports.fetchOrderDetails = async (orderId) => {
  return await prisma.order.findUnique({
    where: { id: parseInt(orderId) },
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
      user: {
        select: {
          address: true,
        },
      },
      driver: {
        select: {
          fullName: true,
          phone: true,
        },
      },
    },
  });
};

// Fetch orders
exports.fetchOrders = async () => {
  return await prisma.order.findMany({
    include: {
      restaurant: {
        select: {
          name: true,
          image: true,
        },
      },
      user: {
        select: {
          address: true,
        },
      },
    },
  });
};
