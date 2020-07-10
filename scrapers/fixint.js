// Import database
const Book = require("../database/bookModel");
const connectMongoose = require("../database/initMongoose");

require("dotenv").config({});

(async function () {
  try {
    const MongoClient = require("mongodb").MongoClient;
    const dbName = "development";

    const client = new MongoClient(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    console.log("Connected");

    const db = client.db(dbName);

    let book = await db.collection("books").remove({
      _id: { $type: "string" },
    });

    console.log(book);

    console.log("Done");
    await client.close();
    process.exit(0);
  } catch (error) {}
})();
