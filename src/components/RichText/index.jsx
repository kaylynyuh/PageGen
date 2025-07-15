import React, { useCallback } from "react";
import { Editor, Transforms, Text } from "slate";

const RichText = ({ editor }) => {
  const isMarkActive = (format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  };

  const toggleMark = (format) => {
    const isActive = isMarkActive(format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  const handleToggleMark = useCallback(
    (event, format) => {
      event.preventDefault();
      toggleMark(format);
    },
    [editor]
  );

  return (
    <div>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          handleToggleMark(event, "bold");
        }}
      >
        Bold
      </button>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          handleToggleMark(event, "underline");
        }}
      >
        Underline
      </button>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          handleToggleMark(event, "code");
        }}
      >
        Code
      </button>
    </div>
  );
};

export default RichText;
