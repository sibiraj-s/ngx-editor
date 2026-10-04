import { ParseOptions, Schema } from 'prosemirror-model';
import { EditorState, Plugin, Transaction } from 'prosemirror-state';
import { EditorProps, EditorView } from 'prosemirror-view';
import { Observable, Subject } from 'rxjs';

import { isNil } from 'ngx-editor/utils';

import EditorCommands from './EditorCommands';
import defautlSchema from './schema';
import { parseContent } from './parsers';
import getDefaultPlugins from './defaultPlugins';
import { HTML } from './trustedTypesUtil';

type JSONDoc = Record<string, unknown>;
type Content = HTML | null | JSONDoc;

interface Options {
  content?: Content;
  history?: boolean;
  keyboardShortcuts?: boolean;
  inputRules?: boolean;
  schema?: Schema;
  plugins?: Plugin[];
  nodeViews?: EditorProps['nodeViews'];
  attributes?: EditorProps['attributes'];
  features?: EditorFeatures;
  handleScrollToSelection?: EditorProps['handleScrollToSelection'];
  linkValidationPattern?: string;
  parseOptions?:ParseOptions;
}

interface SetContentOptions {
  addToHistory?: boolean;
}

// marks the transaction of a value written by the form control
const FORM_WRITE = 'FORM_WRITE';

// docs emitted for values written by the form control
const formWrites = new WeakSet<JSONDoc>();

interface EditorFeatures {
  linkOnPaste?: boolean;
  resizeImage?: boolean;
}

const defaultFeatures = {
  linkOnPaste: true,
  resizeImage: true,
};

const DEFAULT_OPTIONS: Options = {
  content: null,
  history: true,
  keyboardShortcuts: true,
  inputRules: true,
  schema: defautlSchema,
  plugins: [],
  nodeViews: {},
  attributes: {},
  features: defaultFeatures,
  handleScrollToSelection: null,
  linkValidationPattern: '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/??([^#\n\r]*)?#?([^\n\r]*)|(mailto:.*[@].*)|(tel:(?=.*[0-9])[- +()0-9]+)',
};

class Editor {
  private options: Options;
  view: EditorView;

  constructor(options: Options = DEFAULT_OPTIONS) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.createEditor();
  }

  private valueChangesSubject = new Subject<JSONDoc>();
  private updateSubject = new Subject<EditorView>();

  get valueChanges(): Observable<JSONDoc> {
    return this.valueChangesSubject.asObservable();
  }

  get update(): Observable<EditorView> {
    return this.updateSubject.asObservable();
  }

  get schema(): Schema {
    return this.options.schema || defautlSchema;
  }

  get linkValidationPattern(): string {
    return this.options.linkValidationPattern;
  }

  get commands(): EditorCommands {
    return new EditorCommands(this.view);
  }

  get features(): EditorFeatures {
    return { ...defaultFeatures, ...this.options.features };
  }

  private handleTransactions(tr: Transaction): void {
    const state = this.view.state.apply(tr);
    this.view.updateState(state);

    this.updateSubject.next(this.view);

    // an update listener dispatched another transaction, which already emitted the newer doc
    if (this.view.state !== state) {
      return;
    }

    if (!tr.docChanged && !tr.getMeta('FORCE_EMIT')) {
      return;
    }

    const json = state.doc.toJSON();

    if (tr.getMeta(FORM_WRITE)) {
      formWrites.add(json);
    }

    this.valueChangesSubject.next(json);
  }

  private createEditor(): void {
    const { options, schema } = this;
    const { content = null, nodeViews } = options;
    const { history = true, keyboardShortcuts = true, inputRules = true } = options;

    const doc = parseContent(content, schema, options.parseOptions);

    const plugins: Plugin[] = options.plugins ?? [];
    const attributes: EditorProps['attributes'] = options.attributes ?? {};

    const defaultPlugins = getDefaultPlugins(schema, {
      history,
      keyboardShortcuts,
      inputRules,
    });

    this.view = new EditorView(null, {
      state: EditorState.create({
        doc,
        schema,
        plugins: [...defaultPlugins, ...plugins],
      }),
      nodeViews,
      dispatchTransaction: this.handleTransactions.bind(this),
      attributes,
      handleScrollToSelection: options.handleScrollToSelection,
    });
  }

  setContent(content: Content, options: SetContentOptions = {}): void {
    const tr = this.createContentTransaction(content, options);

    if (tr) {
      this.view.dispatch(tr);
    }
  }

  private createContentTransaction(content: Content, options: SetContentOptions): Transaction | null {
    if (isNil(content)) {
      return null;
    }

    const { state } = this.view;
    const { tr, doc } = state;

    const newDoc = parseContent(content, this.schema, this.options.parseOptions);

    const start = doc.content.findDiffStart(newDoc.content);
    const attrsChanged = !doc.hasMarkup(newDoc.type, newDoc.attrs);

    // don't emit if both content is same
    if (start === null && !attrsChanged) {
      return null;
    }

    if (start !== null) {
      // replace only the changed range, so the selection is mapped instead of being moved to the end
      let { a: endA, b: endB } = doc.content.findDiffEnd(newDoc.content);
      const overlap = start - Math.min(endA, endB);

      if (overlap > 0) {
        endA += overlap;
        endB += overlap;
      }

      tr.replace(start, endA, newDoc.slice(start, endB));
    }

    if (attrsChanged) {
      // replacing the content keeps the existing root node, so update its attributes separately
      Object.entries(newDoc.attrs).forEach(([name, value]) => {
        tr.setDocAttribute(name, value);
      });
    }

    if (!tr.docChanged) {
      return null;
    }

    if (options.addToHistory === false) {
      tr.setMeta('addToHistory', false);
    }

    return tr;
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

// internal, used by the editor component to set the value written by the form
export const writeFormValue = (editor: Editor, content: Content, options: SetContentOptions = {}): void => {
  // the method is private to keep it out of the public api
  // eslint-disable-next-line @typescript-eslint/dot-notation
  const tr = editor['createContentTransaction'](content, options);

  if (tr) {
    editor.view.dispatch(tr.setMeta(FORM_WRITE, true));
  }
};

// internal, whether the emitted doc is from a value written by the form
export const isFormWrite = (jsonDoc: JSONDoc): boolean => formWrites.has(jsonDoc);

export default Editor;
