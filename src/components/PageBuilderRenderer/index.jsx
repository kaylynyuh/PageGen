import React, { useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { usePageBuilder } from '../../contexts/PageBuilderContext';
import './styles.scss';

const PageBuilderRenderer = () => {
  const { value, renderElement, renderLeaf } = usePageBuilder();
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

export default PageBuilderRenderer;