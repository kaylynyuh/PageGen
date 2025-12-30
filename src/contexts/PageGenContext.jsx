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

const PageGenContext = createContext();

export const usePageGen = () => {
  return useContext(PageGenContext);
};

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "Hello world." }],
  },
];

export const PageGenProvider = ({ children }) => {
  const [editor] = useState(() => withReact(createEditor()));
  const [value, setValue] = useState(() => {
    const savedValue = localStorage.getItem("editorValue");
    return savedValue
      ? JSON.parse(savedValue)
      : JSON.parse(JSON.stringify(initialValue));
  });
  const [lastSaved, setLastSaved] = useState(new Date());
  const [lastModified, setLastModified] = useState(new Date());

  useEffect(() => {
    if (!isEqual(value, initialValue)) {
      localStorage.setItem("editorValue", JSON.stringify(value));
    }
  }, [value, initialValue]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (new Date() - lastModified > 5000) {
        setLastSaved(new Date());
        setLastModified(new Date());
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [lastModified, value, lastSaved]);

  const handleValueChange = (newValue) => {
    if (!isEqual(newValue, initialValue)) {
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
    handleValueChange,
    renderElement,
    renderLeaf,
    initialValue,
    lastSaved,
    setLastSaved,
  };

  return (
    <PageGenContext.Provider value={contextValue}>
      {children}
    </PageGenContext.Provider>
  );
};
