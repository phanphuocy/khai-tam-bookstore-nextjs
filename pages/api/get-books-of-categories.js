import nextConnect from "next-connect";
import middleware from "../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  let cursor = await req.db.collection("books").find(
    {
      "category.slug": req.query.q,
    },
    { projection: { introduction: 0 } }
  );

  let books = await cursor.toArray();
  let total = books.length;

  //   console.log(books);

  res.status(200).json({ total: total, data: books });
});

export default handler;
