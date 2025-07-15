import React, { useState, useCallback } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

import RichText from "./components/RichText";
import Navbar from "./components/Navbar";

// Define the initial value of the editor.
const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "Hello world." }],
  },
];

const App = () => {
  const [editor] = useState(() => withReact(createEditor()));

  // When the editor is first created, it is initialized with the content
  // that is passed into the useState hook.
  //
  // We wrap the initialValue in a function to ensure that a new object is
  // created each time the component is rendered. This is important because Slate
  // mutates the value object, and we don't want to mutate the original
  // initialValue object.
  const [value, setValue] = useState(() =>
    JSON.parse(JSON.stringify(initialValue))
  );

  const renderElement = useCallback(({ attributes, children, element }) => {
    switch (element.type) {
      case "paragraph":
        return <p {...attributes}>{children}</p>;
      default:
        return <div {...attributes}>{children}</div>;
    }
  }, []);

  const renderLeaf = useCallback(({ attributes, children, leaf }) => {
    if (leaf.bold && leaf.underline) {
      return (
        <strong style={{ textDecoration: "underline" }} {...attributes}>
          {children}
        </strong>
      );
    }
    if (leaf.bold) {
      return <strong {...attributes}>{children}</strong>;
    }
    if (leaf.underline) {
      return <u {...attributes}>{children}</u>;
    }
    if (leaf.code) {
      return <code {...attributes}>{children}</code>;
    }
    return <span {...attributes}>{children}</span>;
  }, []);

  return (
    <div style={{ border: "2px solid black" }}>
      <Navbar />
      <Slate
        editor={editor}
        initialValue={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <RichText editor={editor} />
        <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
      </Slate>
    </div>
  );
};

export default App;
