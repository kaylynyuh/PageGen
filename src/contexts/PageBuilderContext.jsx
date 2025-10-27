import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { createEditor } from "slate";
import { withReact } from "slate-react";
import { isEqual } from "lodash";

const PageBuilderContext = createContext();

export const usePageBuilder = () => {
  return useContext(PageBuilderContext);
};

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "Hello world." }],
  },
];

export const PageBuilderProvider = ({ children, onExit, onSave }) => {
  const [editor] = useState(() => withReact(createEditor()));
  const [value, setValue] = useState(() =>
    JSON.parse(JSON.stringify(initialValue))
  );

  const [isDirty, setIsDirty] = useState(false);
  // Inform user they have unsaved changes before leaving the page
  useEffect(() => {
    if (isDirty) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = null;
    }
  }, [isDirty]);

  const handleValueChange = (newValue) => {
    if (!isEqual(newValue, initialValue)) {
      setIsDirty(true);
    }
    setValue(newValue);
  };

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

  const contextValue = {
    editor,
    value,
    setValue: handleValueChange,
    renderElement,
    renderLeaf,
    initialValue,
    isDirty,
  };

  return (
    <PageBuilderContext.Provider value={contextValue}>
      {children}
    </PageBuilderContext.Provider>
  );
};
