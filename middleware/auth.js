const jwt = require("jsonwebtoken");
const connectMongoose = require("../database/initMongoose");
const User = require("../database/userModel");
import nextConnect from "next-connect";

async function authUser(req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      msg: "Please sign in.",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await connectMongoose();

    req.user = await User.findById(decoded.id);
    return next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({
        msg: "Invalid token",
      });
    }
    res.status(500).json({
      msg: "Opss!!",
    });
  }
}

const middleware = nextConnect();

middleware.use(authUser);

export default authUser;
