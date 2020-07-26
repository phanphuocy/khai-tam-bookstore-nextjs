import React, { useEffect, useMemo, useState, useRef } from "react";
import styled from "styled-components";
import AdminLayout from "../../../components/Layout/AdminLayout";
import AdminBackButton from "../../../components/Navigation/AdminBackButton";

import { Editor, EditorState } from "draft-js";

import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

const StyledPage = styled.div`
  ${({ theme }) => theme.maxWidths.desktop};

  .container {
    display: flex;
    .container__main {
      margin-right: ${({ theme }) => theme.spacing["8"]};
      flex: 65% 0 1;
    }
    .container__side {
      flex: 35% 0 1;
    }
  }

  .content__text-editor {
    /* background-color: white; */
    padding: ${({ theme }) => `${theme.spacing["2"]} ${theme.spacing["4"]}`};

    span {
      line-height: 145%;
    }
  }
`;

const CreateNewBlogPage = () => {
  // let [editorState, setEditorState] = useState(EditorState.createEmpty());

  // const editor = useMemo(() => withReact(createEditor()), []);
  // const [value, setValue] = useState([
  //   {
  //     type: "paragraph",
  //     children: [{ text: "A line of text in a paragraph." }],
  //   },
  // ]);

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

  return (
    <AdminLayout useDefaultHeader={false}>
      <StyledPage>
        <div className="container">
          <div className="container__main content">
            <AdminBackButton />
            <div className="content__text-editor">
              {/* <Editor editorState={editorState} onChange={setEditorState} /> */}
              {/* <Slate
                editor={editor}
                value={value}
                onChange={(newValue) => setValue(newValue)}
              >
                <Editable spellCheck={false} />
              </Slate> */}
              {editorLoaded ? (
                <CKEditor
                  editor={ClassicEditor}
                  data="<p>Hello from CKEditor 5!</p>"
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
              )}
            </div>
          </div>
          <div className="container__side">Side</div>
        </div>
      </StyledPage>
    </AdminLayout>
  );
};

export default CreateNewBlogPage;
