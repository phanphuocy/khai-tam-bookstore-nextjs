import nextConnect from "next-connect";
import middleware from "../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  let doc = await req.db.collection("books").distinct("subcategory.slug");
  console.log(doc);
  let categories = {};
  for (let i = 0; i < doc.length; i++) {
    categories[doc[i]] = await req.db.collection("books").countDocuments({
      "subcategory.slug": doc[i],
    });
  }
  console.log("CATE:", categories);
  res.status(200).json(categories);
});

export default handler;
