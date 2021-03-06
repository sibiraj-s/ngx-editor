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
          if (node.type.isBlock && node.childCount === 0 && doc.textContent.length === 0) {

            const placeholderNode = Decoration.node(pos, (pos + node.nodeSize), {
              class: PLACEHOLDER_CLASSNAME,
              'data-placeholder': placeholder,
              'data-align': node.attrs.align ?? null
            });

            decorations.push(placeholderNode);
          }

          return false;
        };

        doc.descendants(decorate);
        return DecorationSet.create(doc, decorations);
      }
    }
  });
};

export default placeholderPlugin;
