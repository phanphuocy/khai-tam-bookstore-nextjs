// Import database
const Book = require("../database/bookModel");
const connectMongoose = require("../database/initMongoose");
const fs = require("fs");
const ProgressBar = require("progress");
const categories = require("../scrapers/categories-list");

require("dotenv").config({});

let categoriesToFix = [
  { from: "khoa-hoc-triet-hoc-1", to: "khoa-hoc-triet-hoc" },
  { from: "lich-su-1", to: "lich-su" },
  { from: "van-hoa-nghe-thuat-1", to: "van-hoa-nghe-thuat" },
  { from: "van-hoc/van-hoc-viet-nam", to: "van-hoc-viet-nam" },
  { from: "van-hoc/van-hoc-the-gioi", to: "van-hoc-the-gioi" },
  { from: "y-hoc-thuc-dung-1", to: "y-hoc-thuc-duong" },
];

let subcategoriesToFix = [
  { from: "tai-chinh-ke-toan-1", to: "tai-chinh-ke-toan" },
  { from: "tiep-thi-ban-hang-1", to: "tiep-thi-ban-hang" },
  { from: "ky-nang-lam-viec-1", to: "ky-nang-lam-viec" },
  { from: "thanh-tuu-kinh-doanh-1", to: "thanh-tuu-kinh-doanh" },
  { from: "nghien-cuu-phan-tich-1", to: "nghien-cuu-phan-tich" },
  { from: "am-nhac-1", to: "am-nhac" },
  { from: "hoi-hoa-1", to: "hoi-hoa" },
  { from: "thi-ca-2", to: "thi-ca" },
  { from: "my-thuat-kien-truc-1", to: "my-thuat-kien-truc" },
  { from: "tieu-thuyet-va-truyen-dai", to: "tieu-thuyet-va-truyen-dai-vn" },
  { from: "truyen-ngan-2", to: "truyen-ngan-vn" },
  { from: "tap-van-va-tan-van", to: "tap-van-va-tan-van-vn" },
  { from: "khao-cuu-va-but-ky", to: "khao-cuu-va-but-ky-vn" },
  { from: "tieu-thuyet-va-truyen-dai-1", to: "tieu-thuyet-va-truyen-dai-tg" },
  { from: "truyen-ngan-1", to: "truyen-ngan-tg" },
  { from: "khao-cuu-va-but-ky-1", to: "khao-cuu-va-but-ky-tg" },
  { from: "nghe-thuat-song/cau-chuyen-song", to: "cau-chuyen-song" },
  { from: "dung-sinh-yoga", to: "duong-sinh-yoga" },
];

(async function () {
  try {
    await connectMongoose();

    // Fix categories with Mongoose
    for (let i = 0; i < categoriesToFix.length; i++) {
      let res = await Book.updateMany(
        {
          "category.slug": categoriesToFix[i].from,
        },
        {
          "category.slug": categoriesToFix[i].to,
        }
      );

      console.log(res.n, "documents matched", categoriesToFix[i].from);
      console.log(res.nModified, "documents modified");
    }

    // Fix subcategories with Mongoose
    for (let i = 0; i < subcategoriesToFix.length; i++) {
      let res = await Book.updateMany(
        {
          "subcategory.slug": subcategoriesToFix[i].from,
        },
        {
          "subcategory.slug": subcategoriesToFix[i].to,
        }
      );

      console.log(res.n, "documents matched", subcategoriesToFix[i].from);
      console.log(res.nModified, "documents modified");
    }
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
