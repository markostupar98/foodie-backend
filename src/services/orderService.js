const { PrismaClient } = require("@prisma/client");
const { sendPushNotification } = require("./notificationService");
const prisma = new PrismaClient();

// Create order

exports.createOrder = async (req, res) => {
  const { userId, restaurantId, deliveryAddress, cartItems, total, fcmToken } =
    req.body;

  try {
    console.log(
      `Creating order for user ${userId} at restaurant ${restaurantId}`
    );

    // Sačuvaj FCM token korisnika
    await prisma.user.update({
      where: { id: userId },
      data: { notificationToken: fcmToken },
    });

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

    console.log(`Order ${order.id} created successfully`);

    // Fetch drivers' notification tokens
    const drivers = await prisma.driver.findMany({
      select: { notificationToken: true },
    });

    const notificationPromises = drivers.map(async (driver) => {
      if (driver.notificationToken) {
        console.log(
          `Sending notification to driver with token: ${driver.notificationToken}`
        );

        try {
          await sendPushNotification(
            driver.notificationToken,
            "Nova narudžba je kreirana!",
            "Nova narudžba čeka na vas."
          );
          console.log(
            `Notification sent to driver with token: ${driver.notificationToken}`
          );
        } catch (error) {
          console.error(
            `Failed to send notification to driver with token: ${driver.notificationToken}`,
            error
          );
        }
      } else {
        console.warn(`Driver with no notification token found`);
      }
    });

    await Promise.all(notificationPromises);

    return res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ error: "Error creating order" });
  }
};

// Assign driver to order and send notification to use
exports.assignDriverToOrder = async (req, res) => {
  const { orderId, driverId } = req.body;

  try {
    console.log(`Assigning driver ${driverId} to order ${orderId}`);

    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(orderId) },
      data: {
        driverId: parseInt(driverId),
        status: "delivering",
      },
    });

    console.log(`Order ${orderId} updated with driver ${driverId}`);

    // Fetch user notification token
    const order = await prisma.order.findUnique({
      where: { id: parseInt(orderId) },
      include: { user: true },
    });

    if (order && order.user && order.user.notificationToken) {
      const userNotificationToken = order.user.notificationToken;
      console.log(
        `Sending notification to user ${order.user.id} with token ${userNotificationToken}`
      );

      try {
        await sendPushNotification(
          userNotificationToken,
          "Vaša narudžba je preuzeta!",
          "Vozač je preuzeo vašu narudžbu i uskoro će biti isporučena."
        );
        console.log(
          `Notification sent to user with token: ${userNotificationToken}`
        );
      } catch (error) {
        console.error(
          `Failed to send notification to user with token: ${userNotificationToken}`,
          error
        );
      }
    } else {
      console.warn(`No notification token found for user of order ${orderId}`);
    }

    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error assigning driver to order:", error);
    return res.status(500).json({ error: "Error assigning driver to order" });
  }
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
