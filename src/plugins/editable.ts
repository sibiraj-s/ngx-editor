import { EditorState, Plugin, PluginKey, Transaction } from 'prosemirror-state';

const editablePlugin = (editable = true) => {
  return new Plugin({
    key: new PluginKey('editable'),
    state: {
      init(): boolean {
        return editable;
      },
      apply(tr: Transaction, previousVal: boolean): string {
        return tr.getMeta('UPDATE_EDITABLE') ?? previousVal;
      }
    },
    props: {
      editable(state: EditorState): boolean {
        return this.getState(state);
      }
    }
  });
};

export default editablePlugin;
