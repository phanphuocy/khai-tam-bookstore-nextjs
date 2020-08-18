import React, { useState, useEffect } from "react";
import styled from "styled-components";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import useAPI from "../../hooks/useAPI";
import Link from "next/link";
import Button from "../atomics/Button";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const StyledSearchBar = styled.div`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .spinner {
    position: absolute;
    top: 0;
    right: 0;
    display: inline-block;
    width: 1rem;
    height: 1rem;
  }

  .spinner:after {
    position: absolute;
    top: 4px;
    right: 12px;
    content: " ";
    display: block;
    width: 1.25rem;
    height: 1.25rem;
    margin: 0.5rem;
    border-radius: 50%;
    border: 4px solid #666;
    border-color: #666 transparent #666 transparent;
    animation: spinner 1.2s linear infinite;
  }
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .clear-btn {
    position: absolute;
  }

  .search-input__container {
    width: 100%;
    max-width: 40rem;
    position: relative;
  }

  #search-input__input {
    width: 100%;
    position: relative;
    z-index: 100;
    border-radius: 1rem;
    border: ${({ theme }) => `1px solid ${theme.colors.gray["900"]}`};
    background-color: ${({ theme }) => theme.colors.gray["900"]};
    box-shadow: inset 3px 4px 8px rgba(122, 122, 122, 0.04),
      inset -3px -4px 8px rgba(122, 122, 122, 0.04);
    padding: ${({ theme }) => `${theme.spacing["3"]} ${theme.spacing["6"]}`};
  }

  input#search-input__input::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colors.gray["500"]};
  }

  input#search-input__input:focus {
    border: ${({ theme }) => `1px solid ${theme.colors.green["500"]}`};
  }

  .quick-search__results {
    ${({ theme }) => theme.shadow.base}
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    z-index: 50;
    background-color: white;

    div.quick-search__total {
      background-color: ${({ theme }) => theme.colors.green["500"]};
      color: white;
      padding: ${({ theme }) => `${theme.spacing["4"]} ${theme.spacing["6"]}`};
      display: flex;
      justify-content: space-between;

      a {
        text-decoration: underline;
        color: ${({ theme }) => theme.colors.green["900"]};
      }
    }

    ul.quick-search__results-container {
      padding: ${({ theme }) => `${theme.spacing["4"]} ${theme.spacing["6"]}`};
      li.quick-search__results-item {
        padding: ${({ theme }) => `${theme.spacing["1"]} 0`};
        border-bottom: ${({ theme }) =>
          `1px solid ${theme.colors.border.default}`};

        &:last-of-type {
          border-bottom: none;
        }
      }
    }
  }
  .quick-search__results-mask {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 10;
  }
`;

const SearchBar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(
    router.query.q ? router.query.q : ""
  );
  const [loading, setLoading] = useState(false);
  const [displayResults, setDisplayResults] = useState(false);
  const [results, setResults] = useState(null);

  function handleSearchFocus() {
    if (results !== null) {
      setDisplayResults(true);
    }
  }

  const fetchResults = debounce(async function (term) {
    if (term.length > 2) {
      setLoading(true);
      let res = await useAPI.get(`/api/v1/tim-kiem?search=${term}&limit=10`);
      if (res.status == 200) {
        setLoading(false);
        setResults({ books: res.data.books, total: res.data.total });
        setDisplayResults(true);
      } else {
        setLoading(false);
        setSearchTerm("");
        setDisplayResults(false);
      }
    } else {
      setDisplayResults(false);
    }
  }, 1000);

  function onInputCleared() {
    setSearchTerm("");
    setDisplayResults(false);
    setResults(null);
  }

  function onChangeHandler(inputVal) {
    if (inputVal.length <= 0) {
      onInputCleared();
      return;
    }
    setSearchTerm(inputVal);
    fetchResults(inputVal);
  }

  return (
    <StyledSearchBar>
      <div className="search-input__container">
        <input
          id="search-input__input"
          type="text"
          size="30"
          width="100%"
          placeholder="Bạn tìm sách gì ? Nhập tên sách hoặc tác giả"
          onChange={(e) => onChangeHandler(e.currentTarget.value)}
          onFocus={handleSearchFocus}
          value={searchTerm}
        />
        {loading && <div class="spinner"></div>}
      </div>
      {displayResults && (
        <div className="quick-search__results">
          <div className="quick-search__total">
            <span>Đã tìm được {results.total} kết quả.</span>
            {results.total > 0 && (
              <span>
                <Link href={`/tim-kiem?q=${encodeURI(searchTerm)}`}>
                  <a>Xem tất cả</a>
                </Link>
              </span>
            )}
          </div>
          {results.books.length > 0 ? (
            <ul className="quick-search__results-container">
              {results.books.map((item) => (
                <li className="quick-search__results-item" key={item.slug}>
                  <Link
                    href="/[category]/[subcategory]/[bookslug]"
                    as={`/${item.category.slug}/${item.subcategory.slug}/${item.slug}`}
                  >
                    <a>
                      <p>{item.title}</p>
                      <p>
                        <small>{item.author}</small>
                      </p>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      )}
      {displayResults && (
        <div
          className="quick-search__results-mask"
          onClick={() => setDisplayResults(false)}
        ></div>
      )}
    </StyledSearchBar>
  );
};

export default SearchBar;
