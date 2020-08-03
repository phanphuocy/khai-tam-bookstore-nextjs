const connectMongoose = require("../../../database/initMongoose");
const User = require("../../../database/userModel");

export default async (req, res) => {
  try {
    // Only accept POST method
    if (req.method !== "POST") {
      return res.status(400).json({
        msg: "Bad Method",
      });
    }

    // Check if email, password exists in req
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({
        msg: "Please provide name & email & password",
      });
    }

    await connectMongoose();

    if (await User.exists({ email: email })) {
      return res.status(400).json({
        msg:
          "Email này đã được đăng ký, bạn có thể sử dụng email khác hoặc chuyển sang trang đăng nhập.",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      wishlist: [],
    });

    const token = user.getSignedJwtToken();

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
