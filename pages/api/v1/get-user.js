import authUser from "../../../middleware/auth";
import nextConnect from "next-connect";

const handler = nextConnect();

handler.use(authUser);

handler.get(async (req, res) => {
  // console.log(req.user);
  let maxCacheAge = 3600; // 5 minutes
  res.setHeader("Cache-control", `public, max-age=${maxCacheAge}`);
  res.status(200).json({ success: true, user: req.user });
});

export default handler;
