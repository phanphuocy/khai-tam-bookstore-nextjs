const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  body: {
    type: String,
    maxLength: 1000,
    required: [true, "Please add some content"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "Please add a rating between 1 to 5"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  book: {
    type: mongoose.Schema.ObjectId,
    ref: "Book",
    required: true,
  },
});

// Prevent user from duplicate review more than twice
ReviewSchema.index({ book: 1, user: 1 }, { unique: true });

ReviewSchema.statics.getAverageRating = async function (bookId) {
  const obj = await this.aggregate([
    {
      $match: { book: bookId },
    },
    {
      $group: {
        _id: "$book",
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  try {
    await this.model("Book").findByIdAndUpdate(bookId, {
      averageRating: Math.round(obj[0].averageRating * 10) / 10,
    });
  } catch (error) {
    console.error(error);
  }
};

// Call getAverageRating after save && before delete
ReviewSchema.post("save", function () {
  this.constructor.getAverageRating(this.book);
});

ReviewSchema.pre("remove", function () {
  this.constructor.getAverageRating(this.book);
});

global.Review = global.Review || mongoose.model("Review", ReviewSchema);
module.exports = global.Review;
