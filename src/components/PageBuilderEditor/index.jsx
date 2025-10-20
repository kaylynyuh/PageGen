import React from 'react';
import { Slate, Editable } from 'slate-react';
import { usePageBuilder } from '../../contexts/PageBuilderContext';
import Canvas from "../Canvas";
import LeftPanel from "../LeftPanel";
import RightPanel from "../RightPanel";
import './styles.scss';

const PageBuilderEditor = () => {
  const { editor, value, setValue, renderElement, renderLeaf } = usePageBuilder();

  return (
    <>
      <LeftPanel />
      <Canvas>
        <Slate
          editor={editor}
          initialValue={value}
          onChange={(newValue) => setValue(newValue)}
        >
          <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
        </Slate>
      </Canvas>
      <RightPanel />
    </>
  );
};

export default PageBuilderEditor;
