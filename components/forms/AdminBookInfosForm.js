import React, { useState } from "react";
import { Formik, Form } from "formik";
import SimpleTextField, {
  SimpleTextFieldWithOptions,
} from "../forms/SimpleTextField";
import Button from "../atomics/Button";

const AdminBookInfosForm = ({
  book,
  initialValues,
  authors,
  translators,
  presshouses,
  publishers,
  onFieldLevelBlur,
}) => {
  return (
    <Formik initialValues={initialValues}>
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
          <Button
            style={{ marginTop: "1rem" }}
            onClick={() => props.handleReset()}
            label="Reset"
          />
        </Form>
      )}
    </Formik>
  );
};

export default AdminBookInfosForm;
