import React, { useState } from "react";
import AdminLayout from "../../../components/Layout/AdminLayout";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import SimpleTextField, {
  SimpleTextFieldWithOptions,
} from "../../../components/forms/SimpleTextField";
import SimpleTextAreaField from "../../../components/forms/SimpleTextAreaField";
import ReactMarkdown from "react-markdown";
import StyledMarkdown from "../../../components/providers/StyledMarkdown";

import connectMongoose from "../../../database/initMongoose";
import Book from "../../../database/bookModel";
import { useRouter } from "next/router";
import {
  MainAsideLayout,
  MainColumn,
  AsideColumn,
} from "../../../components/layout/MainAsideLayout";
import EvenColumnsLayout from "../../../components/Layout/EvenColumnsLayout";

import AdminBackButton from "../../../components/Navigation/AdminBackButton";
import AdminBookInfosForm from "../../../components/forms/AdminBookInfosForm";
import AdminBookPricingForm from "../../../components/forms/AdminBookPricingForm";

const StyledPage = styled.div`
  ${({ theme }) => theme.maxWidths.desktop};

  .panel {
    ${({ theme }) => theme.shadow.xs};
    border: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
    ${({ theme }) => theme.borderRadius["rounded"]};
    background-color: white;
    min-height: 5rem;
    margin-bottom: ${({ theme }) => theme.spacing["4"]};

    .panel__content {
      padding: ${({ theme }) => `${theme.spacing["4"]} ${theme.spacing["8"]}`};
    }

    .panel__heading {
      padding: ${({ theme }) =>
        `${theme.spacing["4"]} ${theme.spacing["4"]} ${theme.spacing["3"]}`};
      background-color: ${({ theme }) => theme.colors.gray["900"]};
      border-bottom: ${({ theme }) =>
        `1px solid ${theme.colors.border.default}`};
      display: flex;
      align-items: center;

      img {
        margin-right: ${({ theme }) => theme.spacing["1"]};
        width: 36px;
      }

      .panel__heading-title {
        font-weight: 600;
        color: ${({ theme }) => theme.colors.gray["300"]};
        text-transform: uppercase;
      }

      .panel__heading-subtitle {
        margin-left: ${({ theme }) => theme.spacing["2"]};
        color: ${({ theme }) => theme.colors.gray["300"]};
      }
    }

    .panel__billing {
      border-top: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
      padding: ${({ theme }) => `${theme.spacing["4"]} ${theme.spacing["6"]}`};

      p span:nth-child(2) {
        font-weight: 600;
      }
    }
  }

  .two-columns {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-column-gap: ${({ theme }) => theme.spacing["8"]};

    .two-columns__col {
      min-height: 10rem;
    }
  }

  .equal-columns {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: ${({ theme }) => theme.spacing["4"]};
  }

  .four-one {
    grid-template-columns: 4fr 1fr;
    grid-column-gap: ${({ theme }) => theme.spacing["4"]};
  }

  .bg-white {
    background-color: white;
  }

  .top-heading {
    padding: ${({ theme }) => `${theme.spacing["4"]} 0`};

    h3.top-heading__id-and-date {
      span:nth-child(1) {
        font-weight: 600;
        margin-right: ${({ theme }) => theme.spacing["4"]};
      }
      span:nth-child(2) {
        font-size: 1rem;
      }
    }
  }

  .side-col {
    position: relative;
  }
  .sticky {
    padding: ${({ theme: { spacing } }) => `${spacing["4"]} ${spacing["4"]}`};
    position: fixed;
  }
  .items {
    .items__item {
      border: 1px solid green;
      padding: ${({ theme }) => `${theme.spacing["4"]} ${theme.spacing["6"]}`};
    }
  }
`;

const StyledSectionHeading = styled.h3`
  padding: ${({ theme }) => `${theme.spacing["8"]} 0`};
`;

const AdminEditingBookPage = ({
  book,
  authors,
  translators,
  presshouses,
  publishers,
}) => {
  const router = useRouter();

  const [global, setGlobal] = useState({
    title: book.title ? book.title : "",
    author: book.author ? book.author : "",
    translator: book.translator ? book.translator : "",
    presshouse: book.presshouse ? book.presshouse : "",
    publisher: book.publisher ? book.publisher : "",
    introduction:
      book.introduction && book.introduction.bookIntroduction
        ? book.introduction.bookIntroduction
        : null,
    toc:
      book.introduction && book.introduction.toc ? book.introduction.toc : null,
    discounted:
      book.prices && book.prices.discounted ? book.prices.discounted : null,
  });

  function onFieldLevelBlur(field, value) {
    setGlobal({
      ...global,
      [field]: value,
    });
  }

  return (
    <AdminLayout useDefaultHeader={false} useWhiteBackground>
      <StyledPage>
        <div className="top-navigation"></div>
        <div className="top-heading">
          <AdminBackButton />
          <h3 className="top-heading__id-and-date">{book.title}</h3>
        </div>
        <MainAsideLayout>
          <MainColumn>
            <Formik initialValues={global}>
              {(props) => (
                <Form>
                  <SimpleTextField
                    label="Tựa Sách"
                    name="title"
                    onFieldLevelBlur={onFieldLevelBlur}
                  />
                  <SimpleTextFieldWithOptions
                    label="Tác Giả"
                    name="author"
                    options={authors}
                    checkFor="createNewAuthor"
                    onFieldLevelBlur={onFieldLevelBlur}
                  />
                  <SimpleTextFieldWithOptions
                    label="Dịch Giả"
                    name="translator"
                    options={translators}
                    onFieldLevelBlur={onFieldLevelBlur}
                  />
                  <SimpleTextFieldWithOptions
                    label="Nhà Phát Hành"
                    name="publisher"
                    options={publishers}
                    onFieldLevelBlur={onFieldLevelBlur}
                  />
                  <SimpleTextFieldWithOptions
                    label="Nhà Xuất Bản"
                    name="presshouse"
                    options={presshouses}
                    onFieldLevelBlur={onFieldLevelBlur}
                  />
                  <StyledSectionHeading>Giá Thành</StyledSectionHeading>
                  <EvenColumnsLayout>
                    <Field
                      type="number"
                      min={0}
                      name="discounted"
                      placeholder=""
                    />
                    <Field
                      type="number"
                      min={0}
                      name="discounted"
                      placeholder=""
                    />
                  </EvenColumnsLayout>
                  <section className="pricing panel">
                    <div className="panel__heading">
                      <h6 className="panel__heading-title">Giá Thành</h6>
                    </div>
                    <div className="panel__content">
                      <AdminBookPricingForm
                        book={book}
                        authors={authors}
                        publishers={publishers}
                        presshouses={presshouses}
                      />
                    </div>
                  </section>
                  <div className="panel__heading">
                    <h6 className="panel__heading-title">Lời Giới Thiệu</h6>
                    <p className="panel__heading-subtitle">
                      {props.values.introduction
                        ? props.values.introduction.split(" ").length
                        : 0}{" "}
                      chữ, ~
                      {Math.ceil(
                        props.values.introduction
                          ? props.values.introduction.split(" ").length / 250
                          : 0
                      )}{" "}
                      phút đọc
                    </p>
                  </div>
                  <div className="panel__content">
                    <SimpleTextAreaField name="introduction" />
                  </div>
                </Form>
              )}
            </Formik>
          </MainColumn>
          <AsideColumn></AsideColumn>
        </MainAsideLayout>
      </StyledPage>
    </AdminLayout>
  );
};

export async function getServerSideProps(context) {
  try {
    // console.log(context.params);
    // context.params.id = "5f07cc28d5a6471a36ad7c0c";

    await connectMongoose();

    let book = await Book.findById(context.params.id);

    let authors = await Book.distinct("author").exec();
    let translators = await Book.distinct("translator").exec();
    let presshouses = await Book.distinct("presshouse").exec();
    let publishers = await Book.distinct("publisher").exec();

    if (!book) {
      return { props: {} };
    }

    // let parsedIntro;

    // if (book.introduction && book.introduction.bookIntroduction) {
    //   let parsed = await unified()
    //     .use(markdown)
    //     .use(html)
    //     .process(book.introduction.bookIntroduction);

    //   parsedIntro = parsed.contents;
    // }

    return {
      props: {
        book: JSON.parse(JSON.stringify(book)),
        authors,
        translators,
        publishers,
        presshouses,
      },
    };
  } catch (error) {
    console.log(error);
  }
}

export default AdminEditingBookPage;
