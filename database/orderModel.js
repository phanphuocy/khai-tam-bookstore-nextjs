const mongoose = require("mongoose");

let requiredString = {
  type: String,
  required: true,
};

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
    email: requiredString,
    name: requiredString,
    phone: requiredString,
    title: requiredString,
    fullAddress: requiredString,
    address: requiredString,
    ward: requiredString,
    district: requiredString,
    province: requiredString,
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
      slug: requiredString,
      title: requiredString,
      author: requiredString,
      cover: requiredString,
      quanlity: {
        type: Number,
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
    fulfill: {
      ...requiredString,
      enum: ["pending", "processing", "archived", "canceled"],
    },
    payment: { ...requiredString, enum: ["unpaid", "paid"] },
    delivery: {
      ...requiredString,
      enum: ["preparing", "charged", "delivered"],
    },
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
});

global.Order = global.Order || mongoose.model("Order", OrderSchema);
module.exports = global.Order;
