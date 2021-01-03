import { Plugin, EditorState, PluginKey, Transaction } from 'prosemirror-state';
import { DecorationSet, Decoration } from 'prosemirror-view';

const PLACEHOLDER_CLASSNAME = 'NgxEditor__Placeholder';

const placeholderPlugin = (text?: string): Plugin => {
  return new Plugin({
    key: new PluginKey('placeholder'),
    state: {
      init(): string {
        return text ?? '';
      },
      apply(tr: Transaction, previousVal: string): string {
        const placeholder = tr.getMeta('UPDATE_PLACEHOLDER') ?? previousVal;
        return placeholder;
      }
    },
    props: {
      decorations(state: EditorState): DecorationSet {
        const doc = state.doc;

        const placeholder = this.getState(state);

        if (!placeholder) {
          return DecorationSet.empty;
        }

        if (doc.childCount === 1 && doc?.firstChild?.isTextblock && doc.firstChild.content.size === 0) {
          const placeHolderEl = document.createElement('span');
          placeHolderEl.classList.add(PLACEHOLDER_CLASSNAME);
          placeHolderEl.textContent = placeholder;
          return DecorationSet.create(doc, [Decoration.widget(1, placeHolderEl)]);
        }

        return DecorationSet.empty;
      }
    }
  });
};

export default placeholderPlugin;
