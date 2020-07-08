const fs = require("fs");

(() => {
  const dir = fs.readdirSync("scrapers/retrieved", { encoding: "utf-8" });

  let scrapeItems = [];

  for (let fileIndex = 0; fileIndex < dir.length; fileIndex++) {
    let file = fs.readFileSync(`scrapers/retrieved/${dir[fileIndex]}`, {
      encoding: "utf-8",
    });

    let fileData = JSON.parse(file);

    console.log(typeof fileData);

    for (let i = 0; i < 100; i++) {
      // console.log(file.items[i]);
      let url = Object.values(fileData.items[i])[0];
      console.log(url);
      // scrapeItems.push({
      //   url: file.items[i],
      //   category: file.parent,
      //   categorySlug: file.parentSlug,
      //   subcategory: file.name,
      //   subcategorySlug: file.slug,
      // });
    }
  }

  console.log("LENGTH", scrapeItems.length);

  const string = JSON.stringify(scrapeItems);

  fs.writeFileSync("scrapers/2020-07-08.json", string);
})();
