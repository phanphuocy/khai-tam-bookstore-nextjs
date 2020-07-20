const Order = require("../../../database/orderModel");
const User = require("../../../database/userModel");
const connectMongoose = require("../../../database/initMongoose");

import validateCart from "../../../middleware/validateCart";
import calculatePrices from "../../../middleware/calculatePrices";
import nextConnect from "next-connect";

const handler = nextConnect();

handler.use(validateCart);
handler.use(calculatePrices);

handler.post(async (req, res) => {
  console.log("GOING TO CHECKOUT");
  try {
    await connectMongoose();

    let order = new Order({
      delivery: req.body.delivery,
      payment: req.body.payment,
      items: req.body.items,
      prices: req.prices,
      hasUser: true,
      status: "received",
    });

    console.log("ORDER", order);
    await order.save();

    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    let user;
    let guest;

    if (!token) {
      res.send("OKE");
    } else {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      let user = await User.findById(decoded.id);
    }

    await connectMongoose();

    res.send("OKE");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

export default handler;
