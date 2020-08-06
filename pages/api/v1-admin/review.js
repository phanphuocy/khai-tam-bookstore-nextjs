import middleware from "../../../middleware/authAdmin";
import nextConnect from "next-connect";

import Review from "../../../database/reviewModel";
import Book from "../../../database/bookModel";
import connectMongoose from "../../../database/initMongoose";
import mongoose from "mongoose";
import * as yup from "yup";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  console.log(req.query);
  try {
    await connectMongoose();
    if (req.query.id) {
      //
      if (await !Review.exists({ _id: req.query.id })) {
        return res.status(400).json({
          msg: "cannot find review with this id:" + req.query.id,
        });
      }

      const review = await Review.findById(req.query.id).populate({
        path: "User",
        select: "name",
      });
      res.status(200).json({
        success: true,
        review,
      });
    } else {
      const reviews = await Review.find({})
        .populate({
          path: "user",
          select: "name",
        })
        .populate({
          path: "book",
          select: "title",
        });
      res.status(200).json({
        success: true,
        reviews,
      });
    }
  } catch (error) {
    console.log(error);
    if (error.name === "CastError") {
      return res.status(400).json({
        msg: "cannot find review with this id:" + req.query.id,
      });
    }
    res.status(500).send("Internal Server Error");
  }
});

handler.post(async (req, res) => {
  //
  // Check if client provide correct bookId
  //
  let bookId;
  if (!req.query.bookId) {
    return res.status(400).json({ msg: "Please provide book id" });
  } else {
    bookId = req.query.bookId;
  }

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({
      msg: "Invalid id",
    });
  }

  //
  //
  //
  try {
    await connectMongoose();
    //
    // Check if book exists
    //
    let isBookExists = await Book.exists({ _id: bookId });
    if (!isBookExists) {
      return res.status(400).json({
        msg: "No book exists with this id",
      });
    }

    //
    // User input validation
    //
    let schema = yup.object().shape({
      title: yup.string().required(),
      rating: yup.number().required().positive().integer(),
      body: yup.string().required(),
    });

    let isValid = await schema.isValid(req.body);
    if (!isValid) {
      return res.status(400).json({
        msg: "Invalid body",
      });
    }

    // Validation checked
    // Proceed to create new review
    //
    let review = JSON.parse(req.body);
    review.book = req.query.bookId;
    review.user = req.user._id;

    const doc = await Review.create(review);

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

export default handler;
