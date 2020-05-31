import CodeBlockView from './CodeMirror';
import { Node as ProsemirrorNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';

const nodeViews = {
  code_block: (node: ProsemirrorNode, view: EditorView, getPos: () => number) => {
    return new CodeBlockView(node, view, getPos);
  }
};

export default nodeViews;
