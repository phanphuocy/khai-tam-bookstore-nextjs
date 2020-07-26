import React, { useState, useEffect, useRef } from "react";

// import GFMDataProcessor from "@ckeditor/ckeditor5-markdown-gfm/src/gfmdataprocessor";

const BookIntroductionEditor = ({ initial, onSubmit }) => {
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react"),
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);

  function Markdown(editor) {
    editor.data.processor = new GFMDataProcessor(editor.editing.view.document);
  }

  return editorLoaded ? (
    <CKEditor
      editor={ClassicEditor}
      data={initial}
      onInit={(editor) => {
        // You can store the "editor" and use when it is needed.
        console.log("Editor is ready to use!", editor);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        console.log({ event, editor, data });
      }}
    />
  ) : (
    <div>Editor loading</div>
  );
};

export default BookIntroductionEditor;
