import nextConnect from "next-connect";
import authAdmin from "../../../middleware/authAdmin";
import connectMongoose from "../../../database/initMongoose";
import User from "../../../database/userModel";

const handler = nextConnect();

handler.use(authAdmin);

handler.get(async (req, res) => {
    await connectMongoose();

    //   console.log(req.query);

    //   let limit = parseInt(req.query.limit) || 20;
    //   let page = parseInt(req.query.page) || 1;

    const total = await User.estimatedDocumentCount().exec();
    const users = await User.find({}).sort("-dateOrdered").exec();

    res.status(200).json({ success: true, total, users });
});

export default handler;
