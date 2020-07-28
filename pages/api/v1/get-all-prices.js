const connectMongoose = require("../../../database/initMongoose");
const Book = require("../../../database/bookModel");
const fs = require("fs");
const chalk = require("chalk");

export default async (req, res) => {
  try {
    let cachePath = "./cache-prices.json";
    let hasCache = await fs.existsSync(cachePath);

    if (hasCache) {
      let file = await fs.readFileSync(cachePath, {
        encoding: "utf8",
      });
      file = JSON.parse(file);
      let now = Date.now();
      console.log(chalk.bgBlue("Serving prices from storage"));
      if (Date.now() - file.time < 300000) {
        return res.status(200).json({
          success: true,
          total: Object.keys(file.data).length,
          data: file.data,
        });
      } else {
        await fs.unlinkSync(cachePath);
      }
    }

    connectMongoose();
    let docs = await Book.find({}, "prices slug").exec();
    console.log("RETRIEVED DOCS", docs.length);
    let transformed = {};

    docs.forEach((doc) => {
      transformed[doc.slug] = doc.prices;
    });

    fs.writeFile(
      cachePath,
      JSON.stringify({ time: Date.now(), data: transformed }, null, 2),
      { encoding: "utf8" },
      (err) => {
        if (err) {
          console.error("ERROR while saving cache of prices");
        }
      }
    );

    res.setHeader("Cache-control", "public, max-age=300");
    res.status(200).json({
      success: true,
      total: Object.keys(transformed).length,
      data: transformed,
    });
  } catch (error) {
    console.log(error);
    fs.unlinkSync(cachePath);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};
