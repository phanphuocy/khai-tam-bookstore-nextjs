const connectMongoose = require("../../../database/initMongoose");
const Book = require("../../../database/bookModel");

export default async (req, res) => {
  try {
    let { slug } = req.query;
    if (!slug) {
      return res.status(400).json({
        msg: "Didn't include items",
      });
    }

    let doc = await Book.findOne({
      slug: slug,
    }).select("prices");

    if (!doc.prices.whole) {
      doc.prices.whole = doc.prices.discounted;
      doc.prices.discountedRate = 0;
    }

    res.setHeader("Cache-control", "public, max-age=3600");
    res.status(200).json({
      success: true,
      data: doc.prices,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};
