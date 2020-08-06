import nextConnect from "next-connect";
import authAdmin from "../../../middleware/authAdmin";
import connectMongoose from "../../../database/initMongoose";
import Order from "../../../database/orderModel";

const handler = nextConnect();

handler.use(authAdmin);

handler.get(async (req, res) => {
  await connectMongoose();

  //   console.log(req.query);

  //   let limit = parseInt(req.query.limit) || 20;
  //   let page = parseInt(req.query.page) || 1;

  const total = await Order.estimatedDocumentCount().exec();
  const orders = await Order.find({}).sort("-dateOrdered").exec();

  res.status(200).json({ success: true, total, orders });
});

export default handler;
