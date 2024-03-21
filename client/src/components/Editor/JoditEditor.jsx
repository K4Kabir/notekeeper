import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Spinner from "../loaders/Spinner";
import "../../App.css";

export default function EditorTiny({ onChange, value }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            left: "50%",
            top: "50%",
            zIndex: 5,
          }}
        >
          <Spinner />
        </div>
      )}
      <Editor
        apiKey="40v4y0vj622e4robanfhxj6lqawhn75p6b3wtnzmrbwobru6"
        init={{
          plugins:
            "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
          ai_request: (request, respondWith) =>
            respondWith.string(() =>
              Promise.reject("See docs to implement AI Assistant")
            ),
        }}
        onInit={() => {
          setLoading(false);
        }}
        onEditorChange={(content) => onChange(content)}
        value={value}
      />
    </>
  );
}
