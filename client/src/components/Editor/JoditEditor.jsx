import { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import "../Editor/Editor.css";

const Editor = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = useMemo(
    () => ({
      readonly: false,
      innerHeight: "500px",
    }),
    []
  );

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1} // tabIndex of textarea
      onChange={(newContent) => {
        setContent(newContent);
      }}
    />
  );
};

export default Editor;
