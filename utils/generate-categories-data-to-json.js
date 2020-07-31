// Import database
const fs = require("fs");
const ProgressBar = require("progress");

require("dotenv").config({});

async function getBooks(db, slug) {
  try {
    let cursor = await db.collection("books").find(
      {
        $or: [
          {
            "category.slug": slug,
          },
          {
            "subcategory.slug": slug,
          },
        ],
      },
      {
        projection: {
          _id: 0,
          tags: 0,
          __v: 0,
          publisher: 0,
          nbPage: 0,
          coverType: 0,
          publishDate: 0,
          weight: 0,
        },
      }
    );

    let books = await cursor.toArray();

    for (let i = 0; i < books.length; i++) {
      if (books[i].introduction && books[i].introduction.bookIntroduction) {
        books[i].introduction.bookIntroduction = books[
          i
        ].introduction.bookIntroduction.substring(0, 255);
      }
    }

    return books;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

async function getFilters(db, slug) {
  try {
    let filters = [];

    let authorAggre = await db.collection("books").aggregate([
      {
        $match: {
          $and: [
            { $or: [{ "category.slug": slug }, { "subcategory.slug": slug }] },
            { author: { $exists: true, $ne: null } },
          ],
        },
      },
      { $sortByCount: "$author" },
      { $limit: 5 },
    ]);

    filters.push({
      slug: "authors",
      items: await authorAggre.toArray(),
    });

    let publisherAggre = await db.collection("books").aggregate([
      {
        $match: {
          $and: [
            { $or: [{ "category.slug": slug }, { "subcategory.slug": slug }] },
            { author: { $exists: true, $ne: null } },
          ],
        },
      },
      { $sortByCount: "$publisher" },
      { $limit: 5 },
    ]);

    filters.push({
      slug: "publishers",
      items: await publisherAggre.toArray(),
    });

    let translatorAggre = await db.collection("books").aggregate([
      {
        $match: {
          $and: [
            { $or: [{ "category.slug": slug }, { "subcategory.slug": slug }] },
            { author: { $exists: true, $ne: null } },
          ],
        },
      },
      { $sortByCount: "$translator" },
      { $limit: 5 },
    ]);

    filters.push({
      slug: "translators",
      items: await translatorAggre.toArray(),
    });

    let presshouseAggre = await db.collection("books").aggregate([
      {
        $match: {
          $and: [
            { $or: [{ "category.slug": slug }, { "subcategory.slug": slug }] },
            { author: { $exists: true, $ne: null } },
          ],
        },
      },
      { $sortByCount: "$presshouse" },
      { $limit: 5 },
    ]);

    filters.push({
      slug: "presshouses",
      items: await presshouseAggre.toArray(),
    });

    return filters;
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

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

    // Query all categories
    let categoriesDistinct = await db
      .collection("books")
      .distinct("category.slug");

    console.log(categoriesDistinct);

    let categoryNav = categoriesDistinct.map((cate) => ({
      slug: cate.replace(/\//, "-"),
      children: [],
    }));

    let categoryPaths = categoriesDistinct.map((cate) => ({
      params: {
        category: cate,
      },
    }));

    let subcategoryPaths = [];

    for (let i = 0; i < categoriesDistinct.length; i++) {
      let bar = new ProgressBar(":bar :token1", { total: 4 });

      let books = await getBooks(db, categoriesDistinct[i]);
      bar.tick({ token1: "Got Books" });
      let filters = await getFilters(db, categoriesDistinct[i]);
      bar.tick({ token1: "Got Filters" });

      let children = [];

      let subcategoriesDistinct = await db
        .collection("books")
        .distinct("subcategory.slug", {
          "category.slug": categoriesDistinct[i],
        });

      for (let u = 0; u < subcategoriesDistinct.length; u++) {
        subcategoryPaths.push({
          params: {
            category: categoriesDistinct[i],
            subcategory: subcategoriesDistinct[u],
          },
        });

        let books = await getBooks(db, subcategoriesDistinct[u]);
        let filters = await getFilters(db, subcategoriesDistinct[u]);

        children.push({
          slug: subcategoriesDistinct[u].replace(/\//, "-"),
          total: books.length,
        });

        categoryNav[i].children.push({
          slug: subcategoriesDistinct[u].replace(/\//, "-"),
          nbBooks: books.length,
        });

        let subcategory = {
          slug: subcategoriesDistinct[u].replace(/\//, "-"),
          books,
          filters,
        };

        if (!fs.existsSync("generated/categories")) {
          fs.mkdirSync("generated/categories");
        }
        fs.writeFileSync(
          `generated/categories/${subcategory.slug}.json`,
          JSON.stringify(subcategory, null, 2),
          { encoding: "utf8" }
        );
      }
      bar.tick({ token1: "Got Children" });

      let category = {
        slug: categoriesDistinct[i].replace(/\//, "-"),
        books: books,
        filters: filters,
        children: children,
      };

      fs.writeFileSync(
        `generated/categories/${category.slug}.json`,
        JSON.stringify(category, null, 2),
        {
          encoding: "utf8",
        }
      );

      bar.tick({ token1: "Wrote to Disk" });
    }

    if (!fs.existsSync("generated/paths")) {
      fs.mkdirSync("generated/paths");
    }
    fs.writeFileSync(
      "generated/paths/category.json",
      JSON.stringify(categoryPaths, null, 2),
      { encoding: "utf8" }
    );

    fs.writeFileSync(
      "generated/paths/subcategory.json",
      JSON.stringify(subcategoryPaths, null, 2),
      { encoding: "utf8" }
    );

    fs.writeFileSync(
      "generated/categories.json",
      JSON.stringify(categoryNav, null, 2),
      { encoding: "utf8" }
    );

    console.log("Done");
    await client.close();
    process.exit(0);
  } catch (error) {}
})();
