const mongoose = require("mongoose");

let OrderSchema = new mongoose.Schema({
  withUser: {
    type: Boolean,
    required: true,
  },
  user: {
    userId: String,
    username: String,
  },
  guest: {
    guestEmail: String,
    guestName: String,
  },
  delivery: {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  payment: {
    paymentMethod: {
      type: String,
      required: true,
      enum: ["cod", "online"],
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

global.Order = global.Order || mongoose.model("Order", OrderSchema);
module.exports = global.Order;
