const Book = require("../database/bookModel");
const connectMongoose = require("../database/initMongoose");
var ProgressBar = require("progress");
var cloudinary = require("cloudinary").v2;

require("dotenv").config();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

(async function initializer() {
  try {
    await connectMongoose();

    let books = await Book.find({ cloudinaryId: { $exists: false } })
      .select("_id title cover slug")
      .exec();

    if (books.length == 0) {
      console.log("All books migrated to Cloudinary !");
      process.exit(0);
    }

    const bar = new ProgressBar(":action :bar --- :percent :eta seconds left", {
      total: books.length * 2,
    });

    for (let i = 0; i < books.length; i++) {
      bar.tick({
        action: "Fetching",
      });
      let sourceUrl = `https://khaitam.com${books[i].cover}`;

      let res = await cloudinary.uploader.upload(sourceUrl, {
        folder: "book-cover",
      });

      books[i].cloudinaryId = res.public_id;
      await books[i].save();

      bar.tick({
        action: "Sleeping",
      });
      await sleep(500);
    }

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
