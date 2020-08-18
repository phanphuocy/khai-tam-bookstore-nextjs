import { SitemapStream, streamToPromise } from "sitemap";
import Book from "../../database/bookModel";
import connectMongoose from "../../database/initMongoose";

export default async (req, res) => {
  try {
    const smStream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
      cacheTime: 600000,
    });

    // await connectMongoose();

    // // List of books
    // const books = [];
    // const booksSlugs = await Book.find({})
    //   .select("slug category subcategory")
    //   .exec();

    // // Create each URL row
    // booksSlugs.forEach((book) => {
    //   smStream.write({
    //     url: `/${book.category.slug}/${book.subcategory.slug}/${book.slug}`,
    //     changefreq: "weekly",
    //     priority: 0.9,
    //   });
    // });

    // End sitemap stream
    smStream.end();

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString();

    // Change headers
    res.writeHead(200, {
      "Content-Type": "application/xml",
    });

    // Display output to user
    res.end(sitemapOutput);
  } catch (e) {
    console.log(e);
    res.send(JSON.stringify(e));
  }
};
