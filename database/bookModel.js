const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  translator: String,
  presshouse: String,
  publisher: String,
  nbPage: Number,
  coverType: String,
  publishDate: String,
  weight: Number,
  introduction: {
    bookIntroduction: String,
    additionalIntroduction: String,
    additionalIntroductionSec: String,
  },
  cover: {
    type: String,
    required: true,
  },
  prices: {
    whole: Number,
    discounted: {
      type: Number,
      required: true,
    },
    discountedRate: Number,
  },
  subcategory: {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  category: {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
});
global.BookModel = global.BookModel || mongoose.model("BookModel", bookSchema);
module.exports = global.BookModel;
// module.exports = new mongoose.model("Book", bookModel);
