import React from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import Sticky from "react-stickynode";
import { NextSeo } from "next-seo";

// Import contexts
import { useCart } from "../../../contexts/cartContext";
import { useAuth } from "../../../contexts/userContext";

// Import custom components
import Header from "../../../components/Navigation/Header";
import Footer from "../../../components/Navigation/Footer";
import Button from "../../../components/atomics/Button";
import BookSlugStyledPage from "../../../components/styled-components/BookSlugStyledPage";

// Import database utils
import connectMongoose from "../../../database/initMongoose";
import Book from "../../../database/bookModel";

// Import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faHome,
  faAngleRight,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";

let offers = [
  "Bookmark miễn phí",
  `Giao hàng miễn phí cho đơn hàng từ 150k (nội thành HCM) và
  từ 500k (ngoại thành HCM/ Tỉnh)`,
  "Với mỗi 90k trong đơn hàng, quý khách được tặng 1",
  "Bao đọc sách hay, đổi ngay nếu dở (chi tiết)",
  "Bao sách miễn phí nếu có yêu cầu",
];

const BookPage = ({ book }) => {
  let links = [
    book.author && { label: "Tác Giả:", text: book.author },
    book.translator && { label: "Dịch Giả:", text: book.translator },
    book.publisher && { label: "C.ty Phát Hành:", text: book.publisher },
    book.presshouse && { label: "Nhà Xuất Bản:", text: book.presshouse },
  ];
  links = links.filter((link) => link);

  let addiInfos = [
    book.nbPage && { label: "Số Trang:", text: book.nbPage },
    book.weight && { label: "Trọng Lượng (gr):", text: book.weight },
    book.coverType && { label: "Hình Thức Bìa:", text: book.coverType },
    book.pubblishDate && { label: "Năm Xuất Bản", text: book.pubblishDate },
  ];
  addiInfos = addiInfos.filter((info) => info);
  const { saveForLater, userState, loading, authenticated } = useAuth();
  const { appendBook, removeBook, items, allPrices, pricesLoading } = useCart();
  let hasAlreadyAdded =
    items.map((item) => item.slug).indexOf(book.slug) !== -1;

  return (
    <>
      <NextSeo
        title={book.title + " của " + book.author}
        description={
          book.introduction && book.introduction.bookIntroduction
            ? book.introduction.bookIntroduction.substring(0, 144)
            : ""
        }
        canonical={`${process.env.HOSTNAME}/${book.category.slug}/${book.subcategory.slug}/${book.slug}`}
        openGraph={{
          type: "book",
          url: `${process.env.HOSTNAME}/${book.category.slug}/${book.subcategory.slug}/${book.slug}`,
          title: book.title + " của " + book.author,
          description:
            book.introduction && book.introduction.bookIntroduction
              ? book.introduction.bookIntroduction.substring(0, 144)
              : "",
          book: {
            authors: book.authors || "",
          },
          images: [
            {
              url: `${
                book.cloudinaryId
                  ? `https://res.cloudinary.com/khaitam/image/upload/b_auto,c_pad,h_627,q_auto,r_0,w_1200/v1596767364/${book.cloudinaryId}.jpg`
                  : `https://khaitam.com${book.cover}`
              }`,
              width: 1200,
              height: 627,
              alt: `Ảnh bìa của ${book.title}`,
            },
          ],
        }}
      />
      <Header sameElevate={true} showNavigations={false} />
      <BookSlugStyledPage>
        {/* Navbar */}
        <div className="group navigation-group">
          <nav className="navigation-group__singleton categories-links">
            <span>
              <Link href="/">
                <a>
                  <FontAwesomeIcon icon={faHome} />
                </a>
              </Link>
            </span>
            <FontAwesomeIcon className="slash" icon={faAngleRight} />
            <span>
              <Link href="/[category]" as={`/${book.category.slug}`}>
                <a>{book.category.name}</a>
              </Link>
            </span>
            <FontAwesomeIcon className="slash" icon={faAngleRight} />
            <span>
              <Link href="/[category]" as={`/${book.subcategory.slug}`}>
                <a> {book.subcategory.name}</a>
              </Link>
            </span>
          </nav>
        </div>
        {/* Book information & sale button */}
        <div className="group information-group">
          <div className="information-group__wrapper">
            <div className="information-group__item cover">
              <picture>
                <source
                  srcSet={
                    book.cloudinaryId
                      ? `https://res.cloudinary.com/khaitam/image/upload/v1596767364/${book.cloudinaryId}.webp`
                      : null
                  }
                  type="image/webp"
                />
                <img
                  src={
                    book.cloudinaryId
                      ? `https://res.cloudinary.com/khaitam/image/upload/v1596767364/${book.cloudinaryId}.jpg`
                      : `https://khaitam.com${book.cover}`
                  }
                  alt={`Anh Bia Cua ${book.title}`}
                  width="100%"
                />
              </picture>
            </div>
            <div className="information-group__item title">
              <h1 className="title__book-title">{book.title}</h1>
            </div>
            <div className="information-group__item publish-info">
              <ul>
                {links.map((link) => (
                  <li key={link.label}>
                    <span className="label">{link.label}</span>
                    <span className="text">{link.text}</span>
                  </li>
                ))}
              </ul>

              <div className="spacer-below-title"></div>
            </div>
            <div className="information-group__item pricing">
              {book.prices.whole && (
                <p>
                  <span className="pricing__label">Giá Bìa: </span>
                  <span className="pricing__value">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(book.prices.whole)}
                  </span>
                </p>
              )}
              <p className="pricing__label">Tại Sách Khai Tâm:</p>
              <p>
                <span className="pricing__value pricing__discounted">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(book.prices.discounted)}
                </span>
                <span>(-{book.prices.discountedRate}%)</span>
              </p>
            </div>
            <div className="information-group__item actions">
              <Button
                label={hasAlreadyAdded ? "Đã Thêm Vào Giỏ" : "Thêm Vào Giỏ"}
                onClick={() => appendBook(book)}
                disabled={hasAlreadyAdded}
                style={{ width: "100%" }}
                primary
              />
              <Button
                label={
                  loading
                    ? "Đang Tải"
                    : authenticated &&
                      userState &&
                      userState.wishlist
                        .map((book) => book.slug)
                        .indexOf(book.slug) === -1
                    ? "Mua Sau"
                    : "Đã Lưu"
                }
                // disabled={
                //   loading ||
                //   userState.wishlist
                //     .map((book) => book.slug)
                //     .indexOf(book.slug) !== -1
                // }
                icon={faBookmark}
                style={{ width: "100%" }}
                onClick={() => saveForLater(book)}
              />
            </div>
            <div className="information-group__item offerings">
              <h6 className="addiServices-container__label">
                Giá Trị & Dịch Vụ Cộng Thêm
              </h6>
              <div className="addiServices-container__items">
                {offers.map((line, index) => (
                  <p key={index}>
                    <FontAwesomeIcon icon={faPlusCircle} />
                    <span>{line}</span>
                  </p>
                ))}
              </div>
            </div>
            <div className="information-group__item physical-info">
              <div className="addiInfos-container">
                <ul>
                  {addiInfos.map((link) => (
                    <li key={link.label}>
                      <span className="label">{link.label}</span>
                      <span className="text">{link.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky details information navbar */}
        <Sticky enabled={true}>
          <div className="group details-navigation">
            <nav className="details-navigation__singleton">
              <a href="#gioi-thieu">Giới Thiệu</a>
              <a href="#muc-luc">Mục Lục</a>
              <a href="#cam-nhan">Cảm Nhận</a>
              <a>Cùng Tác Giả</a>
              <a href="#sach-lien-quan">Liên Quan</a>
            </nav>
          </div>
        </Sticky>

        {/* Details information */}
        <div className="group details-group">
          <div className="details-group__wrapper">
            <div
              className="details-group__item details-group__introduction introduction"
              id="gioi-thieu"
            >
              <div className="heading">
                <h2 className="heading-text">Giới Thiệu</h2>
              </div>
              <article className="book-introduction__content">
                {book.introduction && book.introduction.bookIntroduction ? (
                  <ReactMarkdown source={book.introduction.bookIntroduction} />
                ) : (
                  <p>Thông tin đang cập nhập...</p>
                )}
              </article>
            </div>
            <div
              className="details-group__item details-group__toc toc"
              id="muc-luc"
            >
              <div className="heading">
                <h2 className="heading-text">Mục Lục</h2>
              </div>
              <article className="toc__content">
                {book.introduction && book.introduction.toc ? (
                  <ReactMarkdown source={book.introduction.toc} />
                ) : (
                  <p>Thông tin đang cập nhập...</p>
                )}
              </article>
            </div>
            <div
              className="details-group__item details-group__customers-review customers-reviews"
              id="cam-nhan"
            >
              <div className="heading">
                <h2 className="heading-text">Cảm Nhận Của Độc Giả</h2>
              </div>
              <div className="customers-reviews__content">
                <p>Comments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar books & cross sellings */}
        <div
          className="group exploring-group similar-books-container"
          id="sach-lien-quan"
        >
          <div className="heading">
            <h2 className="heading-text">Có Thể Bạn Quan Tâm</h2>
          </div>

          <ul>
            {book.similar.map((siBook) => (
              <li key={siBook.slug} className="si-book">
                <div className="si-book-cover">
                  <img
                    className="book__cover-image"
                    src={
                      siBook.cloudinaryId
                        ? `https://res.cloudinary.com/khaitam/image/upload/h_280,q_80,c_lpad,b_white/v1596767364/${siBook.cloudinaryId}.jpg`
                        : `https://khaitam.com${siBook.cover}`
                    }
                    alt="Book cover"
                    height="320px"
                  />
                </div>
                <div className="si-book-info">
                  <Link
                    href="/[category]/[subcategory]/[bookslug]"
                    as={`/${siBook.category.slug}/${siBook.subcategory.slug}/${siBook.slug}`}
                  >
                    <a>
                      <p className="si-book-category">
                        {siBook.subcategory.name}
                      </p>
                      <p className="si-book-title two-line-clamp">
                        {siBook.title}
                      </p>
                      <p className="si-book-author">{siBook.author}</p>
                    </a>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </BookSlugStyledPage>
      <Footer />
    </>
  );
};

export async function getServerSideProps({ query, req, res, params }) {
  try {
    await connectMongoose();
    let book = await Book.findOne({ slug: params.bookslug }).exec();
    book = JSON.parse(JSON.stringify(book));

    let similar = await Book.find(
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
      .select({ introduction: 0, tags: 0, _id: 0 })
      .limit(10)
      .exec();

    book.similar = JSON.parse(JSON.stringify(similar)) || [];
    return {
      props: {
        book,
      },
    };
  } catch (error) {
    console.log(error);
  }
}

export default BookPage;
