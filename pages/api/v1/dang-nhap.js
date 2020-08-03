const connectMongoose = require("../../../database/initMongoose");
const User = require("../../../database/userModel");

import cookie from "cookie";

export default async (req, res) => {
  try {
    // Only accept POST method
    if (req.method !== "POST") {
      return res.status(400).json({
        msg: "Bad Method",
      });
    }

    // Check if email, password exists in req
    const { email, password } = req.body;
    if (!password || !password) {
      return res.status(400).json({
        msg: "Please provide name & email & password",
      });
    }

    await connectMongoose();

    let user = await User.findOne({ email: email }).select("+password");

    if (!user) {
      return res.status(400).json({
        msg: "Email not found, you may want to register instead.",
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        msg: "Wrong password. :(",
      });
    }
    // Get token
    const token = user.getSignedJwtToken();

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 86400,
      })
    );

    user = user.toObject();

    delete user["password"];
    delete user["_id"];
    delete user["__v"];

    res.status(200).json({ success: true, token, user });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      msg: "Sorry, that didn't work.",
    });
  }
};
