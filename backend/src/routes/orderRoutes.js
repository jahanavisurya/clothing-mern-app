const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const auth = require("../middleware/auth");
const transporter = require("../config/mailer");

// POST /api/orders/checkout
router.post("/checkout", auth, async (req, res) => {
  try {
    const { items } = req.body; // [{productId, size, quantity, name, price} from frontend]
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "No items to checkout" });
    }

    const productIds = items.map((i) => i.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    const orderItems = [];
    let totalPrice = 0;

    for (const item of items) {
      const product = products.find((p) => p._id.toString() === item.productId);
      if (!product) continue;
      const qty = item.quantity || 1;
      const lineTotal = product.price * qty;
      totalPrice += lineTotal;
      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        size: item.size,
        quantity: qty,
      });
    }

    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      totalPrice,
    });

    const user = await User.findById(req.user.id);

    // send confirmation email (best effort)
    try {
      const orderDate = order.orderDate.toISOString().split("T")[0];
      const itemLines = order.items
        .map(
          (i) =>
            `${i.name} (Size: ${i.size}) x ${i.quantity} = ₹${i.price * i.quantity}`
        )
        .join("\n");

      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: user.email,
        subject: `Order Confirmation - ${order._id}`,
        text: `Thank you for your order!\n\nOrder ID: ${order._id}\nOrder Date: ${orderDate}\n\nItems:\n${itemLines}\n\nTotal: ₹${totalPrice}\n\nClothing Brand Store`,
      });
    } catch (emailErr) {
      console.error("Error sending email:", emailErr.message);
    }

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get orders for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
