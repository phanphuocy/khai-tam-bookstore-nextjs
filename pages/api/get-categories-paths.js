const connectMongoose = require("../../database/initMongoose");
const Book = require("../../database/bookModel");

connectMongoose();

export default async (req, res) => {
  console.log("Reach API");
  const response = await Book.find({});
  console.log(response);
  res.send("OKE");
};
