// Import database
const Book = require("../database/bookModel");
const connectMongoose = require("../database/initMongoose");
var remark = require("remark");
var strip = require("strip-markdown");
var vntk = require("vntk");
var orderBy = require("lodash.orderby");
const { localeLowerCase } = require("lower-case");
const removeAccents = require("vn-remove-accents");
var ProgressBar = require("progress");

require("dotenv").config({});

async function getTags(book) {
  // Get Title text
  let words = vntk
    .posTag()
    .tag(localeLowerCase(book.title + " " + book.subcategory.name, "vi"));
  // ---- Only need verbs, nouns, and adjective words
  let wordsToAnalyse = [];
  for (let i = 0; i < words.length; i++) {
    if (words[i][1] === "N" || words[i][1] === "A" || words[i][1] === "V") {
      wordsToAnalyse.push(words[i][0]);
    }
  }
  wordsToAnalyse = wordsToAnalyse.filter(
    (word, i) => wordsToAnalyse.indexOf(word) === i
  );

  console.log("WTA", wordsToAnalyse);

  // Determine whether book has introduction, if not, return the title array as tags
  if (!book.introduction) {
    return wordsToAnalyse.map((word) => removeAccents(word));
  }

  // If else, continue
  // Get plain text
  let bookIntroduction = book.introduction.bookIntroduction.replace(
    /\r?\n|\r/g,
    ""
  );

  let stripped = await remark().use(strip).process(bookIntroduction);

  let plainintro = localeLowerCase(stripped.contents, "vi");

  let tfidf = new vntk.TfIdf();

  tfidf.addDocument(plainintro);

  let tags = [];
  for (let i = 0; i < wordsToAnalyse.length; i++) {
    tfidf.tfidfs(wordsToAnalyse[i], function (index, measure) {
      if (measure > 0) {
        tags.push({
          word: removeAccents(wordsToAnalyse[i]),
          frequency: measure,
        });
      }
    });
  }

  tags = orderBy(tags, "frequency", "desc");
  tags = tags.map((tag) => tag.word);

  return tags;
}

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

    let books = await db.collection("books").find({
      tags: { $exists: false },
    });

    books = await books.toArray();
    console.log("Found", books.length, "docs to replenish tags");
    let bar = new ProgressBar(":bar", { total: books.length });

    for (let i = 0; i < books.length; i++) {
      await db.collection("books").findOneAndUpdate(
        {
          slug: books[i].slug,
        },
        {
          $set: {
            tags: await getTags(books[i]),
          },
        }
      );
      console.log(books[i].title);
      bar.tick();
    }

    // let book = await db.collection("books").findOne({
    //   slug: "tuong-mat-ngu-hanh-giai-menh",
    // });

    // console.log(await getTags(book));

    console.log("Done");
    await client.close();
    process.exit(0);
  } catch (error) {}
})();
