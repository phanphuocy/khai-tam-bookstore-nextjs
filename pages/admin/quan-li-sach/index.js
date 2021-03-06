import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/Layout/AdminLayout";
import styled from "styled-components";
import { useRouter } from "next/router";
import useSWR from "swr";
import useAPI from "../../../hooks/useAPI";
import { useAuth } from "../../../contexts/userContext";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import ReactDropdown from "react-dropdown";
import categories from "../../../generated/categories.json";
import categoryName from "../../../names/categoryName.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../../components/Navigation/Pagination";

const StyledPanel = styled.div`
  ${({ theme }) => theme.borderRadius["rounded"]};
  border: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
  background-color: white;
  min-height: 10rem;

  .content {
    div.content__filters {
      padding: ${({ theme }) => `${theme.spacing["4"]} ${theme.spacing["8"]}`};
    }

    div.content__displaying {
      padding: ${({ theme }) =>
        `${theme.spacing["1"]} ${theme.spacing["8"]} ${theme.spacing["3"]}`};

      button {
        ${({ theme }) => theme.borderRadius["rounded-full"]};
        margin-left: ${({ theme }) => theme.spacing["2"]};
        background-color: ${({ theme }) => theme.colors.gray["600"]};
        padding: ${({ theme }) =>
          `${theme.spacing["1"]} ${theme.spacing["3"]}`};
      }
    }

    table.content__table {
      width: 100%;
      tbody,
      thead {
        tr {
          font-family: ${({ theme }) => theme.fonts.system};
          font-size: 15px;
          padding: ${({ theme }) =>
            `${theme.spacing["4"]} ${theme.spacing["8"]}`};
          border-bottom: ${({ theme }) =>
            `1px solid ${theme.colors.border.default}`};

          td {
            vertical-align: center;
          }
        }

        td,
        th {
          padding: ${({ theme }) =>
            `${theme.spacing["2"]} 0 ${theme.spacing["2"]} ${theme.spacing["4"]}`};
        }
      }
      tbody {
        tr:hover,
        tr:active {
          background-color: ${({ theme }) => theme.colors.gray["800"]};
        }
        tr {
          cursor: pointer;
        }
      }

      .row__book-cover {
        img {
          padding: 3px;
          background-color: white;
          object-fit: cover;
          object-position: center;
        }
      }
    }

    .content__pagination {
      padding: ${({ theme }) => `${theme.spacing["2"]} ${theme.spacing["6"]}`};

      .content__pagination-inform {
        margin-right: ${({ theme }) => theme.spacing["8"]};
        font-size: 13px;
      }

      button {
        ${({ theme }) => theme.borderRadius["rounded"]};
        border: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
        padding: ${({ theme }) =>
          `${theme.spacing["2"]} ${theme.spacing["3"]}`};
        margin-right: ${({ theme }) => theme.spacing["2"]};
      }
      button:hover,
      button:active {
        background-color: ${({ theme }) => theme.colors.gray["800"]};
      }
      button.disabled {
        background-color: ${({ theme }) => theme.colors.gray["800"]};
        color: ${({ theme }) => theme.colors.gray["600"]};
      }
    }
  }

  .filters {
    display: flex;
    .filters__regrex {
      position: relative;
      flex: 60% 1 0;

      input#filters__regrex-input {
        width: 100%;
        ${({ theme }) => theme.borderRadius.rounded};
        padding: ${({ theme }) =>
          `${theme.spacing["2"]} ${theme.spacing["3"]} ${theme.spacing["2"]} ${theme.spacing["10"]}`};
        border: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
      }
      .filters__regrex-icon-mask {
        color: ${({ theme }) => theme.colors.gray["500"]};
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        padding-left: 1rem;
        display: flex;
        align-items: center;
      }
    }

    .filters__attributes {
      flex: 30% 0 1;

      .Dropdown-root {
        .Dropdown-menu {
          max-height: 50vh;
        }
      }
    }
  }
`;

const options = categories.map((category) => ({
  type: "group",
  name: categoryName[category.slug],
  items: category.children.map((child) => ({
    value: child.slug,
    label: categoryName[child.slug] + "(" + child.nbBooks + ")",
  })),
}));

const BookManagementPage = ({ subcategory, page, search }) => {
  const { loading } = useAuth();
  const [nbOfButtons, setNbOfButtons] = useState([]);

  // const [filters, setFilters] = useState({
  //   search: "",
  //   subcategory: query.subcategory || "",
  // });

  const router = useRouter();

  function pagiButtonHandler(page) {
    console.log(page);
    if (page <= 0) {
      return;
    }
    router.push(`/admin/quan-li-sach?page=${page}&subcategory=${subcategory}`);
  }

  function categoDropdownHandler(slug) {
    router.push(`/admin/quan-li-sach?page=${page}&subcategory=${slug}`);
  }

  function clearCategoryHandler() {
    router.push(`/admin/quan-li-sach?page=${page}&subcategory=`);
  }

  function searchInputHandler(value) {
    router.push(
      `/admin/quan-li-sach?page=${page}&subcategory=${subcategory}&search=${value}`
    );
  }

  const limit = router.query.limit || 20;
  page = page || 1;
  search = search || "";

  function onDataSuccess(data, key) {
    let total = data.data.total;
    let lastPage = Math.ceil(total / limit);
    let arr = [];

    let page = parseInt(key.split("/api/v1-admin/books?limit=20&page=")[1]);
    console.log(page);
    if (page > 10) arr.push(page - 10);
    if (page > 3) arr.push(page - 3);
    if (page > 2) arr.push(page - 2);
    if (page > 1) arr.push(page - 1);
    arr.push(page);
    if (lastPage - page > 1) arr.push(page + 1);
    if (lastPage - page > 2) arr.push(page + 2);
    if (lastPage - page > 3) arr.push(page + 3);
    if (lastPage - page > 10) arr.push(page + 10);
    if (router.query.page != lastPage) {
      arr.push(lastPage);
    }

    setNbOfButtons(arr);
  }

  const {
    data: { data, total } = { books: [], total: 0 },
    error,
    isValidating,
  } = useSWR(
    loading
      ? false
      : `/api/v1-admin/books?limit=${limit}&page=${page}&search=${search}&subcategory=${subcategory}`,
    useAPI.get,
    {
      onSuccess: onDataSuccess,
    }
  );

  const showSkeleton = isValidating || loading;

  return (
    <AdminLayout>
      {/* <pre>{JSON.stringify(options, null, 2)}</pre> */}
      <StyledPanel>
        <div className="content">
          <div className="content__filters filters">
            <div className="filters__regrex">
              <input
                type="text"
                id="filters__regrex-input"
                placeholder="Lọc sách theo tên"
                onChange={(e) => searchInputHandler(e.target.value)}
                value={search}
              />
              <div className="filters__regrex-icon-mask">
                <FontAwesomeIcon icon={faSearch} />
              </div>
            </div>
            <div className="filters__attributes">
              <ReactDropdown
                options={options}
                placeholder="Chọn danh mục"
                onChange={(e) => categoDropdownHandler(e.value)}
                value={subcategory}
              />
            </div>
          </div>
          <div className="content__displaying">
            <p>
              {data && <span>Đang hiển thị {data.total} đầu sách</span>}
              {subcategory && (
                <button
                  className="diplaying__clearing-btn"
                  onClick={() => clearCategoryHandler()}
                >
                  {categoryName[subcategory]} <FontAwesomeIcon icon={faTimes} />
                </button>
              )}
            </p>
          </div>
          <table className="content__table">
            <thead>
              <tr>
                <th></th>
                <th>Tựa</th>
                <th>Tác Giả</th>
                <th>Danh Mục Nhỏ</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.books.map((book) => (
                  <Link key={book._id} href={`/admin/quan-li-sach/${book._id}`}>
                    <tr>
                      <td>
                        {book.cloudinaryId && (
                          <img
                            src={`https://res.cloudinary.com/khaitam/image/upload/c_thumb,h_48,w_48/v1597104797/${book.cloudinaryId}.jpg`}
                            alt=""
                            width="48px"
                            height="48px"
                          />
                        )}
                      </td>
                      <td>
                        <p style={{ fontWeight: 600 }}>{book.title}</p>
                        <p style={{ color: "gray" }}>{book.author}</p>
                      </td>
                      <td>{book.author}</td>
                      <td>{book.subcategory.name}</td>
                    </tr>
                  </Link>
                ))}
            </tbody>
          </table>

          {showSkeleton && <Skeleton height={25} count={5} />}
          <div className="content__pagination">
            <span className="content__pagination-inform">
              Bạn đang ở trang {page}
            </span>
            {/* <Pagination
              routerPathname={router.pathname}
              routerQuery={router.query}
              total={total}
            /> */}
            <button
              onClick={() => pagiButtonHandler(1)}
              className={page === "1" ? "disabled" : ""}
              disabled={page === "1" ? "disabled" : ""}
            >
              Trang Đầu
            </button>
            <button
              onClick={() => pagiButtonHandler(parseInt(page) - 1)}
              className={page === "1" ? "disabled" : ""}
              disabled={page === "1" ? "disabled" : ""}
            >
              Trang Trước
            </button>
            {nbOfButtons.map((btn) => (
              <button
                key={btn}
                onClick={() => pagiButtonHandler(btn)}
                className={
                  btn === "1" ||
                  btn == router.query.page ||
                  btn >= nbOfButtons[nbOfButtons - 1]
                    ? "disabled"
                    : ""
                }
              >
                {btn}
              </button>
            ))}
            <button
              onClick={() => pagiButtonHandler(parseInt(page) + 1)}
              className={
                router.query.page === nbOfButtons[nbOfButtons.length - 1]
                  ? "disabled"
                  : ""
              }
              disabled={
                router.query.page >= nbOfButtons[nbOfButtons - 1]
                  ? "disabled"
                  : ""
              }
            >
              Trang Sau
            </button>
            <button
              onClick={() =>
                pagiButtonHandler(nbOfButtons[nbOfButtons.length - 1])
              }
            >
              Trang Cuối
            </button>
          </div>
        </div>
      </StyledPanel>
    </AdminLayout>
  );
};

export async function getServerSideProps({ query }) {
  const { subcategory, page, search } = query;
  return {
    props: {
      subcategory: subcategory || "",
      page: page || null,
      search: search || null,
    }, // will be passed to the page component as props
  };
}

export default BookManagementPage;
