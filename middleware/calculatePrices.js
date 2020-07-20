const connectMongoose = require("../database/initMongoose");
const Book = require("../database/bookModel");

async function calculatePrices(req, res, next) {
  try {
    let { items } = req.body;
    await connectMongoose();

    let docs = await Book.find(
      {
        slug: {
          $in: items.map((item) => item.slug),
        },
      },
      "prices slug title author"
    ).exec();

    if (items.length !== docs.length) {
      return res.status(400).json({
        msg: "The books you order are not correctly input",
      });
    }

    let itemSlugs = items.map((item) => item.slug);

    for (let i = 0; i < docs.length; i++) {
      let index = itemSlugs.indexOf(docs[i].slug);
      items[index] = {
        ...items[index],
        price: docs[i].prices.discounted,
        title: docs[i].title,
        author: docs[i].author,
      };
    }

    let discountedPrice = items.reduce((acc, curr) => {
      return acc + curr.price * curr.quanlity;
    }, 0);

    req.prices = {
      discountedPrice,
    };

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Server Error",
    });
  }
}

export default calculatePrices;
