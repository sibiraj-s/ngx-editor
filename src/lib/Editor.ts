import { Schema, Node as ProsemirrorNode } from 'prosemirror-model';
import { EditorState, Plugin, Transaction } from 'prosemirror-state';
import { Decoration, EditorView, NodeView } from 'prosemirror-view';
import { Subject } from 'rxjs';

import {
  editable as editablePlugin,
  placeholder as placeholderPlugin
} from 'ngx-editor/plugins';
import { history, undo, redo } from 'ngx-editor/history';
import { keymap } from 'ngx-editor/keymap';

import EditorCommands from './EditorCommands';
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
  history?: boolean;
  schema?: Schema;
  plugins?: Plugin[];
  nodeViews?: NodeViews;
}

const DEFAULT_OPTIONS: Options = {
  content: null,
  enabled: true,
  history: false,
  schema: defautlSchema,
  plugins: [],
  nodeViews: {}
};

const isMacOs = /Mac/.test(navigator.platform);

const getHistoryPlugins = (): Plugin[] => {
  const plugins: Plugin[] = [];

  const keyMappings: Record<string, any> = {};

  keyMappings['Mod-z'] = undo;
  if (isMacOs) {
    keyMappings['Shift-Mod-z'] = redo;
  } else {
    keyMappings['Mod-y'] = redo;
  }

  plugins.push(history());
  plugins.push(keymap(keyMappings));

  return plugins;
};

class Editor {
  view: EditorView;
  options: Options;
  el: DocumentFragment;

  onContentChange = new Subject<JSONDoc>();
  onFocus = new Subject<void>();
  onBlur = new Subject<void>();
  onUpdate = new Subject();

  constructor(options: Options = DEFAULT_OPTIONS) {
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);
    this.createEditor();
  }

  get schema(): Schema {
    return this.options.schema || defautlSchema;
  }

  get commands(): EditorCommands {
    return new EditorCommands(this.view);
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
    const state = this.view.state.apply(tr);
    this.view.updateState(state);

    this.onUpdate.next();

    if (!tr.docChanged && !tr.getMeta('FORCE_EMIT')) {
      return;
    }

    const json = state.doc.toJSON();
    this.onContentChange.next(json);
  }

  private createEditor(): void {
    const { options } = this;
    const { content, nodeViews, enabled } = options;
    const schema = this.schema;

    const editable = enabled ?? true;
    const placeholder = options.placeholder ?? '';

    const doc = parseContent(content, schema);
    this.el = document.createDocumentFragment();

    const plugins: Plugin[] = [
      editablePlugin(),
      placeholderPlugin(placeholder),
      ...(options.plugins ?? [])
    ];

    if (options.history) {
      plugins.push(...getHistoryPlugins());
    }

    this.view = new EditorView(this.el, {
      editable: () => editable,
      state: EditorState.create({
        doc,
        schema,
        plugins,
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
