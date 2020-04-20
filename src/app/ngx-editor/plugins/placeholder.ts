import { Plugin, EditorState, PluginKey } from 'prosemirror-state';
import { DecorationSet, Decoration } from 'prosemirror-view';

function placeholderPlugin(text: string) {
  return new Plugin({
    key: new PluginKey('placeholder'),
    props: {
      decorations(state: EditorState) {
        const doc = state.doc;

        if (doc.childCount === 1 && doc.firstChild.isTextblock && doc.firstChild.content.size === 0) {
          const placeHolderEl = document.createElement('span');
          placeHolderEl.classList.add('NgxEditor-Placeholder');
          placeHolderEl.textContent = text;
          return DecorationSet.create(doc, [Decoration.widget(1, placeHolderEl)]);
        }

        return DecorationSet.empty;
      }
    }
  });
}

export default placeholderPlugin;
