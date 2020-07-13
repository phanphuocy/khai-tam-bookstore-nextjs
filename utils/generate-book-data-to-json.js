// Import database
const Book = require("../database/bookModel");
const connectMongoose = require("../database/initMongoose");
const fs = require("fs");
const ProgressBar = require("progress");

require("dotenv").config({});

(async function () {
  try {
    // Create MongoDB client
    const MongoClient = require("mongodb").MongoClient;
    const dbName = "development";
    const client = new MongoClient(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    console.log("Connected");
    const db = client.db(dbName);

    // Query all books
    let books = await db
      .collection("books")
      .find({}, { projection: { _id: 0 } });
    books = await books.toArray();
    console.log("Fetched", books.length, "books");

    let bar = new ProgressBar(":bar", { total: books.length });

    // Gerate books content to json
    for (let i = 0; i < books.length; i++) {
      let book = books[i];

      let similar = await db
        .collection("books")
        .find(
          {
            $and: [
              {
                $text: {
                  $search: book.tags.join(" "),
                },
              },
              {
                slug: { $ne: book.slug },
              },
            ],
          },
          { score: { $meta: "textScore" } }
        )
        .limit(20);

      similar = await similar.toArray();

      similar.forEach(function (doc) {
        delete doc.introduction;
        delete doc.tags;
        delete doc._id;
      });

      book.similar = similar;

      let dataString = JSON.stringify(book);

      fs.writeFileSync(`generated/books/${books[i].slug}.json`, dataString, {
        encoding: "utf8",
      });
      bar.tick();
    }

    let bookPaths = books.map((book) => ({
      params: {
        category: book.category.slug,
        subcategory: book.subcategory.slug,
        bookslug: book.slug,
      },
    }));

    fs.writeFileSync("generated/paths/books.json", JSON.stringify(bookPaths), {
      encoding: "utf8",
    });

    console.log("Done");
    await client.close();
    process.exit(0);
  } catch (error) {}
})();
