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
  cloudinaryId: String,
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
  averageRating: {
    type: Number,
  },
});
global.Book = global.Book || mongoose.model("Book", bookSchema);
module.exports = global.Book;
// module.exports = new mongoose.model("Book", bookModel);
