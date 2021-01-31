import { Schema } from 'prosemirror-model';
import { EditorState, Plugin, Transaction } from 'prosemirror-state';
import { EditorProps, EditorView } from 'prosemirror-view';
import { Subject } from 'rxjs';

import { isNil } from 'ngx-editor/utils';

import EditorCommands from './EditorCommands';
import defautlSchema from './schema';
import { parseContent } from './parsers';
import getDefaultPlugins from './defaultPlugins';

type JSONDoc = Record<string, any>;
type Content = string | null | JSONDoc;

interface Options {
  content?: Content;
  history?: boolean;
  keyboardShortcuts?: boolean;
  inputRules?: boolean;
  schema?: Schema;
  plugins?: Plugin[];
  nodeViews?: EditorProps['nodeViews'];
}

const DEFAULT_OPTIONS: Options = {
  content: null,
  history: true,
  keyboardShortcuts: true,
  inputRules: true,
  schema: defautlSchema,
  plugins: [],
  nodeViews: {}
};

class Editor {
  view: EditorView;
  options: Options;
  el: DocumentFragment;

  valueChange = new Subject<JSONDoc>();
  update = new Subject();

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

    this.update.next();

    if (!tr.docChanged && !tr.getMeta('FORCE_EMIT')) {
      return;
    }

    const json = state.doc.toJSON();
    this.valueChange.next(json);
  }

  private createEditor(): void {
    const { options } = this;
    const { content = null, nodeViews } = options;
    const { history = true, keyboardShortcuts = true, inputRules = true } = options;
    const schema = this.schema;

    const doc = parseContent(content, schema);
    this.el = document.createDocumentFragment();

    const plugins: Plugin[] = options.plugins ?? [];

    const defaultPlugins = getDefaultPlugins(schema, {
      history,
      keyboardShortcuts,
      inputRules
    });

    plugins.push(...defaultPlugins);

    this.view = new EditorView(this.el, {
      state: EditorState.create({
        doc,
        schema,
        plugins,
      }),
      nodeViews,
      dispatchTransaction: this.handleTransactions.bind(this)
    });
  }

  registerPlugin(plugin: Plugin): void {
    const { state } = this.view;
    const plugins = [...state.plugins, plugin];

    const newState = state.reconfigure({ plugins });
    this.view.updateState(newState);
  }

  destroy(): void {
    this.view.destroy();
  }
}

export default Editor;
