import { Node as ProseMirrorNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';

import CodeBlockView from './CodeMirror';

const nodeViews = {
  code_mirror: (node: ProseMirrorNode, view: EditorView, getPos: () => number): CodeBlockView => {
    return new CodeBlockView(node, view, getPos);
  }
};

export default nodeViews;
