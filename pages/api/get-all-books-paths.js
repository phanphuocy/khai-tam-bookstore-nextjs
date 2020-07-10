import nextConnect from "next-connect";
import middleware from "../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  let cursor = await req.db.collection("books").find({});
  let books = await cursor.toArray();

  books = books.map((book) => ({
    params: {
      category: book.category.slug,
      subcategory: book.subcategory.slug,
      bookslug: book.slug,
    },
  }));

  res.status(200).json({
    total: books.length,
    data: books,
  });
});

export default handler;
