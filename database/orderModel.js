const mongoose = require("mongoose");

let OrderSchema = new mongoose.Schema({
  owner: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  items: [
    {
      slug: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
    },
  ],
  prices: {
    discountedPrice: {
      type: Number,
      required: true,
    },
  },
  status: {
    type: String,
    required: true,
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
});
