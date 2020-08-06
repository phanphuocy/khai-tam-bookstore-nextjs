import middleware from "../../../middleware/auth";
import nextConnect from "next-connect";

import Review from "../../../database/reviewModel";
import connectMongoose from "../../../database/initMongoose";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  try {
    await connectMongoose();

    if (req.user) {
      const reviews = await Review.find({});

      return res.status(200).json({
        success: true,
        reviews,
      });
    } else {
      return res.status(400).send("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

export default handler;
