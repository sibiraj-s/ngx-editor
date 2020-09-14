import { Plugin } from 'prosemirror-state';
import { Node as ProsemirrorNode, Schema } from 'prosemirror-model';
import { EditorView, Decoration, NodeView } from 'prosemirror-view';

export interface NodeViews {
  [name: string]: (
    node: ProsemirrorNode,
    view: EditorView,
    getPos: () => number,
    decorations: Decoration[]
  ) => NodeView;
}

export interface NgxEditorConfig {
  schema?: Schema;
  plugins?: Plugin[];
  nodeViews?: NodeViews;
}
