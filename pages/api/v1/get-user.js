import middleware from "../../../middleware/auth";
import nextConnect from "next-connect";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  // console.log(req.user);
  res.status(200).json({ success: true, user: req.user });
});

export default handler;
