import React from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import Sticky from "react-stickynode";

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
      <Header sameElevate={true} showNavigations={false} />
      <BookSlugStyledPage>
        <div className="container">
          <section className="top-navigation">
            <nav className="top-navigation__container">
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
          </section>
          <section className="book-info">
            <div className="cover-container">
              <img
                src={`https://khaitam.com${book.cover}`}
                alt={`Anh Bia Cua ${book.title}`}
                height="100%"
              />
            </div>
            <div className="infomation-container">
              <h1 className="title">{book.title}</h1>
              <div className="links-container">
                <ul>
                  {links.map((link) => (
                    <li key={link.label}>
                      <span className="label">{link.label}</span>
                      <span className="text">{link.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="spacer-below-title"></div>
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
              <div className="addiServices-container">
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
            </div>
            <div>
              {pricesLoading ? (
                <p>
                  <Skeleton />
                </p>
              ) : (
                <p>{allPrices[book.slug].discounted}</p>
              )}
            </div>

            <div className="action-container">
              <Button
                label={
                  loading
                    ? "Đang Tải"
                    : authenticated &&
                      userState &&
                      userState.wishlist
                        .map((book) => book.slug)
                        .indexOf(book.slug) === -1
                    ? "Để Dành Mua Sau"
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
                containerStyle={{ marginBottom: "0.25rem" }}
                onClick={() => saveForLater(book)}
              />
              <Button
                label={hasAlreadyAdded ? "Đã Thêm Vào Giỏ" : "Thêm Vào Giỏ"}
                onClick={() => appendBook(book)}
                disabled={hasAlreadyAdded}
                style={{ width: "100%" }}
                primary
              />
            </div>
          </section>
          <Sticky enabled={true}>
            <section className="navigation">
              <nav>
                <a href="#gioi-thieu">Giới Thiệu</a>
                <a>Mục Lục</a>
                <a href="#cam-nhan">Cảm Nhận</a>
                <a>Cùng Tác Giả</a>
                <a href="#sach-lien-quan">Liên Quan</a>
              </nav>
            </section>
          </Sticky>
          <section className="book-introduction" id="gioi-thieu">
            <h2>Giới Thiệu</h2>
            <article className="book-introduction__content">
              {book.introduction && book.introduction.bookIntroduction ? (
                <ReactMarkdown source={book.introduction.bookIntroduction} />
              ) : (
                <p>Thông tin đang cập nhập...</p>
              )}
            </article>
          </section>
        </div>
        <div className="customers-reviews" id="cam-nhan">
          <div className="container">
            <h3 section="panel-title">Cảm Nhận Của Độc Giả</h3>
            <p>Comments</p>
            <p>Comments</p>
            <p>Comments</p>
          </div>
        </div>
        <div style={{ height: "1rem" }}></div>
        <div className="container similar-books-container" id="sach-lien-quan">
          <h3 section="panel-title">Có Thể Bạn Quan Tâm</h3>
          <ul>
            {book.similar.map((siBook) => (
              <li key={siBook.slug} className="si-book">
                <div className="si-book-cover">
                  <img
                    src={`https://khaitam.com${siBook.cover}`}
                    alt={`Book cover of ${siBook.title}`}
                    width="100%"
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
                      <p className="si-book-title">{siBook.title}</p>
                      <p className="si-book-author">{siBook.author}</p>
                    </a>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ height: "1rem" }}></div>
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
      .limit(8)
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
