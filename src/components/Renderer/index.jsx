import React, { useState } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

import { usePageGen } from "../../contexts/PageGenContext";
import "./styles.scss";

const Renderer = () => {
  const { value, renderElement, renderLeaf } = usePageGen();
  const [editor] = useState(() => withReact(createEditor()));

  return (
    <div className="page-builder-renderer">
      <Slate editor={editor} initialValue={value}>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          readOnly
        />
      </Slate>
    </div>
  );
};

export default Renderer;
