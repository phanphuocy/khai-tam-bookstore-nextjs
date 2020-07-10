import nextConnect from "next-connect";
import middleware from "../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const slug = req.query.slug;

  let book = await req.db.collection("books").findOne({
    slug: slug,
  });

  res.status(200).json(book);
});

export default handler;
