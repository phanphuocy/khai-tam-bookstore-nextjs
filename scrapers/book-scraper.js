const fs = require("fs");
const puppeteer = require("puppeteer");
const chalk = require("chalk");
const TurndownService = require("turndown");
const getSlug = require("speakingurl");
const util = require("util");

// Import database
const Book = require("../database/bookModel");
const connectMongoose = require("../database/initMongoose");

require("dotenv").config();

function sleep() {
  let ms = 5000 + Math.random() * 5000;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function handleEachBookUrl(url, browser, category) {
  const page = await browser.newPage();
  console.log(chalk.blue("Opened a new page"));

  try {
    console.log(chalk.yellow("Prepare to going to", url));
    await page.goto(url);
    console.log(chalk.blue("Page navigated to", url));

    page.on("console", (consoleObj) => console.log(consoleObj.text()));

    let metaTags = await page.evaluate(() => {
      let rows = document.querySelectorAll(".divTranslator");
      rows = [...rows];

      let metas = {};

      for (let i = 0; i < rows.length; i++) {
        if (rows[i].children[0].textContent === "Dịch giả:") {
          metas.translator = rows[i].children[1].textContent.trim();
        } else if (rows[i].children[0].textContent === "Nhà xuất bản:") {
          metas.presshouse = rows[i].children[1].textContent.trim();
        } else if (rows[i].children[0].textContent === "Công ty phát hành:") {
          metas.publisher = rows[i].children[1].textContent.trim();
        } else if (rows[i].children[0].textContent === "Số trang:") {
          let nbPage = rows[i].children[1].textContent.trim();
          metas.nbPage = parseInt(nbPage, 10);
        } else if (rows[i].children[0].textContent === "Hình thức bìa:") {
          metas.coverType = rows[i].children[1].textContent.trim();
        } else if (rows[i].children[0].textContent === "Ngày xuất bản:") {
          metas.publishDate = rows[i].children[1].textContent
            .trim()
            .replace("-", "/");
        } else if (rows[i].children[0].textContent === "Trọng lượng (gr):") {
          let weightString = rows[i].textContent.trim();
          weightString = weightString.match(/\d+/);
          metas.weight = parseInt(weightString);
        }
      }

      return metas;
    });

    // Get Title
    metaTags.title = await page.evaluate(
      () =>
        Array.from(
          document.querySelectorAll("h1.name"),
          (element) => element.textContent
        )[0]
    );

    metaTags.author = await page.evaluate(() => {
      let elem = document.querySelector(".divAuthor a");
      if (elem) {
        return elem.textContent;
      } else {
        return "Không Rõ Tác Giả";
      }
    });

    // console.log(metaTags);

    // Get Book's Introduction
    const turndownService = new TurndownService();

    let introduction = await page.evaluate(() => {
      let paragraphs = document.querySelectorAll(
        "#gioi-thieu .product-description-wrap"
      );
      paragraphs = [...paragraphs];

      let raw = [];

      for (let i = 0; i < paragraphs.length; i++) {
        raw.push(paragraphs[i].innerHTML);
      }

      return raw.join("");
    });
    introduction = turndownService.turndown(introduction).trim();

    let additionalIntro = await page.evaluate(() => {
      let paragraphs = document.querySelectorAll(
        "#tab1 .product-description-wrap"
      );
      paragraphs = [...paragraphs];

      if (paragraphs.length === 0) {
        return [];
      }
      let raw = [];
      for (let i = 0; i < paragraphs.length; i++) {
        raw.push(paragraphs[i].innerHTML);
      }
      return raw.join("");
    });

    if (additionalIntro.length > 0) {
      additionalIntro = turndownService.turndown(additionalIntro).trim();
    }

    let additionalIntroSecond = await page.evaluate(() => {
      let paragraphs = document.querySelectorAll(
        "#tab2 .product-description-wrap"
      );
      paragraphs = [...paragraphs];

      if (paragraphs.length === 0) {
        return [];
      }
      let raw = [];
      for (let i = 0; i < paragraphs.length; i++) {
        raw.push(paragraphs[i].innerHTML);
      }
      return raw.join("");
    });

    if (additionalIntroSecond.length > 0) {
      additionalIntroSecond = turndownService
        .turndown(additionalIntroSecond)
        .trim();
    }

    // Get book's image
    let imagePath = await page.evaluate(() => {
      let elems = Array.from(document.querySelectorAll(".image img"));
      if (elems.length > 0) {
        return elems[0].getAttribute("src");
      } else {
        return "/images/book-cover-placeholder.jpg";
      }
    });

    // console.log(imagePath);

    // Get prices
    let wholePrice = await page.evaluate(() => {
      let priceString = document.querySelector(".other-price span");
      if (!priceString) {
        return null;
      }
      let price = parseInt(
        priceString.textContent.replace(/\./gi, "").match(/\d+/)
      );
      return price;
    });
    59;

    let discountedPrice = await page.evaluate(() => {
      let priceString = document.querySelector(".price-gruop span").textContent;
      price = parseInt(priceString.replace(/\./gi, "").match(/\d+/));
      return price;
    });

    let savePrice = await page.evaluate(() => {
      let elem = document.querySelector(".price-gruop:last-child span");
      if (!elem) {
        return null;
      }
      let price = parseInt(elem.textContent.replace(/\./gi, "").match(/\d+/));
      return price;
    });

    let discountedRate;
    if (wholePrice && savePrice) {
      discountedRate = Math.round((savePrice / wholePrice) * 100);
    }

    // console.log("Whole Price", wholePrice);
    // console.log("Discounted Price", discountedPrice);
    // console.log("Discounted", discountedRate);

    let slug = getSlug(metaTags.title, { lang: "vn", truncate: 70 });

    const lookForAdded = await Book.find({ slug: slug }).exec();

    if (lookForAdded.length > 0) {
      slug = [
        getSlug(metaTags.title, { lang: "vn", truncate: 80 }),
        getSlug(metaTags.publishDate, { lang: "vn", truncate: 40 }),
      ].join("-");
    }

    let book = new Book({
      ...metaTags,
      slug: slug,
      prices: {
        discounted: discountedPrice,
      },
      category: {
        name: category.parent,
        slug: category.parentSlug,
      },
      subcategory: {
        name: category.name,
        slug: category.slug,
      },
      cover: imagePath,
    });

    if (wholePrice) {
      book.prices.whole = wholePrice;
      book.prices.discountedRate = discountedRate;
    }

    if (introduction.length > 0) {
      book.introduction.bookIntroduction = introduction;
    }
    if (additionalIntro.length > 0) {
      book.introduction.additionalIntro = additionalIntro;
    }
    if (additionalIntroSecond.length > 0) {
      book.introduction.additionalIntroSec = additionalIntroSecond;
    }

    await book.save();
    console.log(
      chalk.bgGreenBright.black("Successfuly saved book:", metaTags.title)
    );

    await page.close();
    console.log(chalk.blue("Page closed"));

    console.log(chalk.gray("Going to sleep for a bit"));
    await sleep();
  } catch (error) {
    await page.close();
    console.log(error);
    process.exit(1);
  }
}

async function handleEachJsonFile(path, browser, fileIndex, beginItem) {
  try {
    const readFile = util.promisify(fs.readFile);

    let category = await readFile(`scrapers/retrieved/${path}`, {
      encoding: "utf-8",
    });

    category = JSON.parse(category);

    let nbItemToScrape;

    if (category.items.length > 144) {
      nbItemToScrape = 144;
    } else {
      nbItemToScrape = category.items.length;
    }

    for (let i = beginItem; i < nbItemToScrape; i++) {
      console.log(chalk.bgGray("File:", fileIndex));
      console.log(chalk.bgGray("Book Item:", i, "/", nbItemToScrape));
      await handleEachBookUrl(category.items[i].link, browser, category);
    }
  } catch (err) {
    console.log(chalk.red(err));
    process.exit(1);
  }
}

(async () => {
  try {
    const browser = await puppeteer.launch();
    console.log(chalk.blue("Launched Puppeteer"));

    await connectMongoose();
    console.log("Connected to database");

    const allJson = fs.readdirSync("scrapers/retrieved");

    const beginFile = 32;
    let beginItem = 11;

    for (let i = beginFile; i < allJson.length; i++) {
      console.log(chalk.bgGray("File:", i, "/", allJson.length - 1));
      await handleEachJsonFile(allJson[i], browser, i, beginItem);
      beginItem = 0;
    }

    console.log("Finished");

    await browser.close();
  } catch (error) {
    console.log(chalk.red(error));
    process.exit(1);
  }
})();
