import { Schema, Node as ProsemirrorNode } from 'prosemirror-model';
import { EditorState, Plugin, Transaction } from 'prosemirror-state';
import { Decoration, EditorView, NodeView } from 'prosemirror-view';
import { Subject } from 'rxjs';

import {
  editable as editablePlugin,
  placeholder as placeholderPlugin
} from 'ngx-editor/plugins';

import defautlSchema from './schema';
import { parseContent } from './parsers';
import isNil from './utils/isNil';

type Content = string | Record<string, any> | null;
type JSONDoc = Record<string, null> | null;

interface NodeViews {
  [name: string]: (
    node: ProsemirrorNode,
    view: EditorView,
    getPos: () => number,
    decorations: Decoration[]
  ) => NodeView;
}

interface Options {
  content?: Content;
  enabled?: boolean;
  placeholder?: string;
  schema?: Schema;
  plugins?: Plugin[];
  nodeViews?: NodeViews;
}

class Editor {
  view: EditorView;
  options: Options;
  el: DocumentFragment;

  onContentChange = new Subject<JSONDoc>();
  onFocus = new Subject<void>();
  onBlur = new Subject<void>();
  onUpdate = new Subject();

  constructor(options: Options) {
    this.options = options;
    this.createEditor(options);
  }

  get schema(): Schema {
    return this.options.schema || defautlSchema;
  }

  setContent(content: Content): void {
    if (isNil(content)) {
      return;
    }

    const { state } = this.view;
    const { tr, doc } = state;

    const newDoc = parseContent(content, this.schema);

    tr.replaceWith(0, state.doc.content.size, newDoc);

    // don't emit if both content is same
    if (doc.eq(tr.doc)) {
      return;
    }

    if (!tr.docChanged) {
      return;
    }

    this.view.dispatch(tr);
  }

  private handleTransactions(tr: Transaction): void {
    const { state } = this.view.state.applyTransaction(tr);
    this.view.updateState(state);

    this.onUpdate.next();

    if (!tr.docChanged) {
      return;
    }

    const json = state.doc.toJSON();
    this.onContentChange.next(json);
  }

  private createEditor(options: Options): void {
    const { content, plugins, nodeViews, enabled } = options;
    const schema = this.schema;

    const editable = enabled ?? true;
    const placeholder = options.placeholder ?? '';

    const doc = parseContent(content, schema);
    this.el = document.createDocumentFragment();

    this.view = new EditorView(this.el, {
      editable: () => editable,
      state: EditorState.create({
        doc,
        schema,
        plugins: [
          editablePlugin(),
          placeholderPlugin(placeholder),
          ...plugins
        ],
      }),
      nodeViews,
      dispatchTransaction: this.handleTransactions.bind(this),
      handleDOMEvents: {
        focus: () => {
          this.onFocus.next();
          return false;
        },
        blur: () => {
          this.onBlur.next();
          return false;
        }
      },
      attributes: {
        class: 'NgxEditor__Content'
      },
    });
  }

  registerPlugin(plugin: Plugin): void {
    const { state } = this.view;
    const plugins = [...state.plugins, plugin];

    const newState = state.reconfigure({ plugins });
    this.view.updateState(newState);
  }

  enable(): void {
    const { dispatch, state: { tr } } = this.view;
    dispatch(tr.setMeta('UPDATE_EDITABLE', true));
  }

  disable(): void {
    const { dispatch, state: { tr } } = this.view;
    dispatch(tr.setMeta('UPDATE_EDITABLE', false));
  }

  setPlaceholder(placeholder: string): void {
    const { dispatch, state: { tr } } = this.view;
    dispatch(tr.setMeta('UPDATE_PLACEHOLDER', placeholder));
  }

  destroy(): void {
    this.view.destroy();
  }
}

export default Editor;
