import { EditorState, Plugin, PluginKey, Transaction } from 'prosemirror-state';

const editablePlugin = (editable = true): Plugin => {
  return new Plugin({
    key: new PluginKey('editable'),
    state: {
      init(): boolean {
        return editable;
      },
      apply(tr: Transaction, previousVal: boolean): boolean {
        return tr.getMeta('UPDATE_EDITABLE') ?? previousVal;
      },
    },
    props: {
      editable(state: EditorState): boolean {
        return this.getState(state);
      },
      attributes(state: EditorState): Record<string, string> | null {
        const isEnabled = this.getState(state);

        if (isEnabled) {
          return null;
        }

        return {
          class: 'NgxEditor__Content--Disabled',
        };
      },
    },
  });
};

export default editablePlugin;
