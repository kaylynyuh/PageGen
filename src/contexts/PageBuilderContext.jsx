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

export const PageBuilderProvider = ({ children, onSave }) => {
  const [editor] = useState(() => withReact(createEditor()));
  const [value, setValue] = useState(() =>
    JSON.parse(JSON.stringify(initialValue))
  );
  const [lastSaved, setLastSaved] = useState(new Date());
  const [lastModified, setLastModified] = useState(new Date());
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isDirty && new Date() - lastModified > 5000) {
        onSave(value);
        setLastSaved(new Date());
        setIsDirty(false);
        setLastModified(new Date());
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isDirty, lastModified, onSave, value]);

  const handleValueChange = (newValue) => {
    if (!isEqual(newValue, initialValue)) {
      setIsDirty(true);
      setLastModified(new Date());
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
    lastSaved,
  };

  return (
    <PageBuilderContext.Provider value={contextValue}>
      {children}
    </PageBuilderContext.Provider>
  );
};
