import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import styled from "styled-components";

const StyledForm = styled.div`
  label {
    margin: ${({ theme }) => `${theme.spacing["3"]} 0`};
  }
  .bottom-spacing {
    margin-bottom: ${({ theme }) => theme.spacing["2"]};
  }
  input[type="text"],
  select {
    ${({ theme }) => theme.borderRadius["rounded"]};
    /* ${({ theme }) => theme.shadow.inner}; */
    border: ${({ theme }) => `1px solid ${theme.colors.border.default}`};
    padding: ${({ theme }) => `${theme.spacing["3"]} ${theme.spacing["4"]}`};
    /* background-color: ${({ theme }) => theme.colors.gray["900"]}; */
    background-color: rgba(252,252,252,1);
    width: 100%;
  }

  .field {
    .field__label {
      /* padding: ${({ theme }) => `0 ${theme.spacing["2"]}`}; */
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .field__label label {
      color: ${({ theme }) => theme.colors.gray["300"]};
    }
  }
`;

const AdminBookInfosForm = ({ book, authors, presshouses, publishers }) => {
  // const [authorOptions, setAuthorOptions] = useState(authors);
  const initialValues = {
    title: book.title ? book.title : "",
    author: book.author ? book.author : "",
    presshouse: book.presshouse ? book.presshouse : "",
    publisher: book.publisher ? book.publisher : "",
  };

  return (
    <StyledForm>
      <Formik
        initialValues={{
          ...initialValues,
          createNewAuthor: false,
          createNewPublisher: false,
          createNewPresshouse: false,
        }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(props) => (
          <Form>
            <div className="field">
              <div className="field__label">
                <label htmlFor="title">Tựa Sách</label>
              </div>
              <Field type="text" name="title" placeholder="Tụa Để" />
            </div>
            <div className="field">
              <div className="field__label">
                <label htmlFor="author">Tác Giả</label>
                <span>
                  <Field type="checkbox" name="createNewAuthor" />
                  Tạo Mới
                </span>
              </div>
              <Field
                disabled={props.values.createNewAuthor}
                className="bottom-spacing"
                as="select"
                name="author"
                placeholder="Tác Giả"
              >
                {authors.map((author) => (
                  <option value={author}>{author}</option>
                ))}
              </Field>

              {props.values.createNewAuthor && (
                <Field
                  disabled={!props.values.createNewAuthor}
                  type="text"
                  name="author"
                  placeholder="Tác Giả"
                />
              )}
            </div>

            <div className="field">
              <div className="field__label">
                <label htmlFor="publisher">Công Ty Phát Hành</label>
                <span>
                  <Field type="checkbox" name="createNewPublisher" />
                  Tạo Mới
                </span>
              </div>
              <Field
                disabled={props.values.createNewPublisher}
                className="bottom-spacing"
                as="select"
                name="publisher"
                placeholder="Công Ty Phát Hành"
              >
                {publishers.map((publisher) => (
                  <option value={publisher}>{publisher}</option>
                ))}
              </Field>

              {props.values.createNewPublisher && (
                <Field
                  disabled={!props.values.createNewPublisher}
                  type="text"
                  name="publisher"
                  placeholder="Công Ty Phát Hành"
                />
              )}
            </div>

            <div className="field">
              <div className="field__label">
                <label htmlFor="presshouse">Nhà Xuất Bản</label>
                <span>
                  <Field type="checkbox" name="createNewPresshouse" />
                  Tạo Mới
                </span>
              </div>
              <Field
                disabled={props.values.createNewPresshouse}
                className="bottom-spacing"
                as="select"
                name="presshouse"
                placeholder="Nhà Xuất Bản"
              >
                {presshouses.map((presshouse) => (
                  <option value={presshouse}>{presshouse}</option>
                ))}
              </Field>

              {props.values.createNewPresshouse && (
                <Field
                  disabled={!props.values.createNewPresshouse}
                  type="text"
                  name="presshouse"
                  placeholder="Nhà Xuất Bản"
                />
              )}
            </div>

            {/* <button type="submit">Submit</button> */}
          </Form>
        )}
      </Formik>
    </StyledForm>
  );
};

export default AdminBookInfosForm;
