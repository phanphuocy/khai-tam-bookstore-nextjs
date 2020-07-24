import nextConnect from "next-connect";
import authAdmin from "../../../middleware/authAdmin";
import connectMongoose from "../../../database/initMongoose";
import Book from "../../../database/bookModel";

const handler = nextConnect();

handler.use(authAdmin);

handler.get(async (req, res) => {
  await connectMongoose();

  console.log("QUERY", req.query);

  let searchTerm = new RegExp(decodeURI(req.query.search));

  console.log("TERM", searchTerm);

  let limit = parseInt(req.query.limit) || 20;
  let page = parseInt(req.query.page) || 1;

  let projection = {
    $or: [{ title: searchTerm }, { author: searchTerm }],
    ...(req.query.subcategory && { "subcategory.slug": req.query.subcategory }),
  };

  const total = await Book.countDocuments(projection).exec();
  const books = await Book.find(projection)
    .select("-introduction")
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip((page - 1 < 0 ? 0 : page - 1) * limit)
    .exec();
  // query.setOptions({ limit: 20 });

  res.status(200).json({ success: true, total, books });
});

export default handler;
