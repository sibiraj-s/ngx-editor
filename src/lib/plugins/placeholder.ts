import { Plugin, EditorState, PluginKey, Transaction } from 'prosemirror-state';
import { DecorationSet, Decoration } from 'prosemirror-view';
import { Node as ProseMirrorNode } from 'prosemirror-model';

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
        const { doc } = state;

        const placeholder = this.getState(state);

        if (!placeholder) {
          return DecorationSet.empty;
        }

        const decorations: Decoration[] = [];

        const decorate = (node: ProseMirrorNode, pos: number) => {
        if (doc.childCount === 1 && doc?.firstChild?.isTextblock && doc.firstChild.content.size === 0) {
          const placeHolderEl = document.createElement('span');
          placeHolderEl.classList.add(PLACEHOLDER_CLASSNAME);
          placeHolderEl.textContent = placeholder;
          return DecorationSet.create(doc, [Decoration.widget(1, placeHolderEl)]);
        }

            const placeholderNode = Decoration.node(pos, (pos + node.nodeSize), {
              class: PLACEHOLDER_CLASSNAME,
              'data-placeholder': placeholder
            });

            decorations.push(placeholderNode);
          }
        };

        doc.descendants(decorate);
        return DecorationSet.create(doc, decorations);
      }
    }
  });
};

export default placeholderPlugin;
