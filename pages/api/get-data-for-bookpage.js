import nextConnect from "next-connect";
import middleware from "../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const slug = req.query.slug;

  let book = await req.db.collection("books").findOne({
    slug: slug,
  });

  let similar = await req.db
    .collection("books")
    .find(
      {
        $and: [
          {
            $text: {
              $search: book.tags.join(" "),
            },
          },
          {
            slug: { $ne: book.slug },
          },
        ],
      },
      { score: { $meta: "textScore" } }
    )
    .limit(20);

  similar = await similar.toArray();

  similar.forEach(function (doc) {
    delete doc.introduction;
    delete doc.tags;
  });

  res.status(200).json({
    book,
    similar,
  });
});

export default handler;
