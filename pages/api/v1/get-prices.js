const connectMongoose = require("../../../database/initMongoose");
const Book = require("../../../database/bookModel");

export default async (req, res) => {
  res.send("This api route is deprecated");
  // try {
  //   console.log(req.query);
  //   let { cartItems } = req.query;
  //   if (!cartItems) {
  //     return res.status(400).json({
  //       msg: "Didn't include items",
  //     });
  //   }
  //   cartItems = JSON.parse(decodeURI(cartItems));
  //   console.log(cartItems);
  //   let docs = await Book.find({
  //     slug: { $in: cartItems },
  //   });
  //   let itemQuantities = {};
  //   for (let i = 0; i < cartItems.length; i++) {
  //     itemQuantities[cartItems[i].slug] = cartItems[i].nbOfItems;
  //   }
  //   // Check if all slugs is valid
  //   if (docs.length !== cartItems.length) {
  //     return res.status(400).json({
  //       msg:
  //         "Could not found books for these slugs, please provide valids slugs.",
  //     });
  //   }
  //   // function accumulateDiscountedPrice(acc, curDoc) {
  //   //   return acc + curDoc.prices.discounted;
  //   // }
  //   // function accumulateWholePrice(acc, curDoc) {
  //   //   if (curDoc.prices.whole) {
  //   //     return acc + curDoc.prices.whole;
  //   //   } else {
  //   //     return acc + curDoc.prices.discounted;
  //   //   }
  //   // }
  //   // let discountedPrice = docs.reduce(accumulateDiscountedPrice, 0);
  //   // let wholePrice = docs.reduce(accumulateWholePrice, 0);
  //   let individualPrices = {};
  //   for (let i = 0; i < docs.length; i++) {
  //     individualPrices[docs[i].slug] = docs[i].prices;
  //   }
  //   res.setHeader("Cache-control", "public, max-age=300");
  //   res.status(200).json({
  //     success: true,
  //     data: {
  //       // discountedPrice,
  //       // wholePrice,
  //       individualPrices,
  //     },
  //   });
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({
  //     msg: "Server Error",
  //   });
  // }
};
