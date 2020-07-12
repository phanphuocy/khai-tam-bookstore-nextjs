import nextConnect from "next-connect";
import middleware from "../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  try {
    let query = req.query.q;
    let cursor = await req.db.collection("books").find(
      {
        "subcategory.slug": query,
      },
      { projection: { introduction: 0 } }
    );

    let books = await cursor.toArray();
    let total = books.length;

    // let authorCount = await req.db.collection("books").distinct("author", {
    //   "subcategory.slug": req.query.q,
    // });

    // console.log(authorCount);

    let authorAggre = await req.db.collection("books").aggregate([
      {
        $match: {
          $and: [
            { "subcategory.slug": query },
            { author: { $exists: true, $ne: null } },
          ],
        },
      },
      { $sortByCount: "$author" },
      { $limit: 5 },
    ]);

    authorAggre = await authorAggre.toArray();

    console.log("AGGRE", authorAggre);

    let publisherAggre = await req.db.collection("books").aggregate([
      {
        $match: {
          $and: [
            { "subcategory.slug": query },
            { publisher: { $exists: true, $ne: null } },
          ],
        },
      },
      { $sortByCount: "$publisher" },
      { $limit: 5 },
    ]);

    publisherAggre = await publisherAggre.toArray();

    console.log("PUB", publisherAggre);

    let translatorAggre = await req.db.collection("books").aggregate([
      {
        $match: {
          $and: [
            { "subcategory.slug": query },
            { translator: { $exists: true, $ne: null } },
          ],
        },
      },
      { $sortByCount: "$translator" },
      { $limit: 5 },
    ]);

    translatorAggre = await translatorAggre.toArray();

    console.log("TRANS", translatorAggre);

    let presshouseAggre = await req.db.collection("books").aggregate([
      {
        $match: {
          $and: [
            { "subcategory.slug": query },
            { presshouse: { $exists: true, $ne: null } },
          ],
        },
      },
      { $sortByCount: "$presshouse" },
      { $limit: 5 },
    ]);

    presshouseAggre = await presshouseAggre.toArray();

    console.log("PRESS", presshouseAggre);

    res.status(200).json({
      total: total,
      data: books,
      filter: {
        authorCounts: authorAggre,
        translatorCounts: translatorAggre,
        publisherCounts: publisherAggre,
        presshouseCounts: presshouseAggre,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

export default handler;
