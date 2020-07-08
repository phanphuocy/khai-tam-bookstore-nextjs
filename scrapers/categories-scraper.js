const puppeteer = require("puppeteer");
const chalk = require("chalk");
const fs = require("fs");

const categories = require("./categories-list");

async function extractBooksFromPage(browser, baseUrl, number) {
  try {
    const page = await browser.newPage();
    console.log(chalk.blue("Instantiate New Page"));

    let url = baseUrl + "?pagesize=48&pagenumber=" + number;

    await page.goto(url);
    console.log(chalk.grey("Is on page", url));

    // Scrape the data on page
    const booksOnPage = await page.evaluate(() => {
      let books = document.querySelectorAll("h2.product-name > a");
      books = [...books];
      let rawData = [];
      for (let i = 0; i < books.length; i++) {
        let link = books[i].getAttribute("href");
        let child = books[i].children[0];
        console.log("Getting:.....", books[i].children[0].textContent);
        rawData.push({
          link: link,
          title: child.textContent.trim(),
        });
      }
      return rawData;
    });

    console.log(
      chalk.blue(
        "Scraped books on this page, found",
        booksOnPage.length,
        "books"
      )
    );

    if (booksOnPage.length === 0) {
      console.log(chalk.blue("Hit Last Page"));
      await page.close();
      return booksOnPage;
    } else {
      const nextPage = parseInt(url.match(/pagenumber=(\d+)$/)[1], 10) + 1;
      console.log(chalk.yellow("Going to next page", nextPage));
      await page.close();
      return booksOnPage.concat(
        await extractBooksFromPage(browser, baseUrl, nextPage)
      );
    }
  } catch (error) {
    console.log(chalk.red(error));
    process.exit(1);
  }
}

(async () => {
  try {
    const browser = await puppeteer.launch();
    console.log(chalk.blue("Launched Puppeteer"));
    const baseUrl = "https://www.khaitam.com";

    for (let i = 31; i < categories.length; i++) {
      let url =
        baseUrl + "/" + categories[i].parentSlug + "/" + categories[i].slug;
      console.log(chalk.green(categories[i].name));
      console.log(url);

      const data = await extractBooksFromPage(browser, url, 1);

      let newFile = {
        name: categories[i].name,
        slug: categories[i].slug,
        parent: categories[i].parent,
        parentSlug: categories[i].parentSlug,
        items: data,
      };

      newFile = JSON.stringify(newFile, null, 2);
      fs.writeFileSync(
        `scrapers/retrieved/${categories[i].parentSlug.replace(
          "/",
          "-"
        )}-${categories[i].slug.replace("/", "-")}.json`,
        newFile
      );
    }

    await browser.close();
  } catch (err) {
    console.log(chalk.red(err));

    process.exit(1);
  }
})();
