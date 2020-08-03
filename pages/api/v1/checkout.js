const Order = require("../../../database/orderModel");
const User = require("../../../database/userModel");
const connectMongoose = require("../../../database/initMongoose");
const jwt = require("jsonwebtoken");

import validateCart from "../../../middleware/validateCart";
import calculatePrices from "../../../middleware/calculatePrices";
import nextConnect from "next-connect";

const handler = nextConnect();

handler.use(validateCart);
handler.use(calculatePrices);

handler.post(async (req, res) => {
  try {
    await connectMongoose();

    let order = new Order({
      delivery: req.body.delivery,
      payment: req.body.payment,
      items: req.body.items,
      prices: req.prices,
      status: "pending",
    });

    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    let user;

    if (!token) {
      order.withUser = false;
      order.guest = {
        guestEmail: req.body.delivery.email,
        guestName: req.body.delivery.name,
      };

      await order.save();
    } else {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      user = await User.findById(decoded.id);

      order.withUser = true;
      order.user = {
        userId: user._id,
        username: user.name,
      };

      let saved = await order.save();

      console.log(saved);

      if (saved.withUser) {
        if (user.orders) {
          user.orders.push({
            delivery: saved.delivery,
            payment: saved.payment,
            items: saved.items,
            prices: saved.prices,
            status: saved.status,
            dateOrdered: saved.dateOrdered,
          });
        } else {
          user.orders = [
            {
              delivery: saved.delivery,
              payment: saved.payment,
              items: saved.items,
              prices: saved.prices,
              status: saved.status,
              dateOrdered: saved.dateOrdered,
            },
          ];
        }
      }

      await User.findByIdAndUpdate(decoded.id, user);
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

export default handler;
