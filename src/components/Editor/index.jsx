import React from 'react';
import { Slate, Editable } from 'slate-react';
import { usePageGen } from '../../contexts/PageGenContext';
import Canvas from "../Canvas";
import LeftPanel from "../LeftPanel";
import RightPanel from "../RightPanel";
import './styles.scss';

const Editor = () => {
  const { editor, value, handleValueChange, renderElement, renderLeaf } = usePageGen();

  return (
    <>
      <LeftPanel />
      <Canvas>
        <Slate
          editor={editor}
          initialValue={value}
          onChange={handleValueChange}
        >
          <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
        </Slate>
      </Canvas>
      <RightPanel />
    </>
  );
};

export default Editor;
