import { Plugin, EditorState, PluginKey } from 'prosemirror-state';
import { DecorationSet, Decoration } from 'prosemirror-view';

const DEFAULT_PLACEHOLDER = 'Type Here...';
const PLACEHOLDER_CLASSNAME = 'NgxEditor__Placeholder';

function placeholderPlugin(text: string = DEFAULT_PLACEHOLDER): Plugin {
  return new Plugin({
    key: new PluginKey('placeholder'),
    props: {
      decorations(state: EditorState): DecorationSet {
        const doc = state.doc;

        if (doc.childCount === 1 && doc.firstChild.isTextblock && doc.firstChild.content.size === 0) {
          const placeHolderEl = document.createElement('span');
          placeHolderEl.classList.add(PLACEHOLDER_CLASSNAME);
          placeHolderEl.textContent = text;
          return DecorationSet.create(doc, [Decoration.widget(1, placeHolderEl)]);
        }

        return DecorationSet.empty;
      }
    }
  });
}

export default placeholderPlugin;
