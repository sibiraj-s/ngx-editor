import { Node as ProsemirrorNode } from 'prosemirror-model';
import { NodeSelection, Plugin, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

const WRAPPER_CLASSNAME = 'NgxEditor__ImageWrapper';
const WRAPPER_RESIZE_ACTIVE_CLASSNAME = 'NgxEditor__Resizer--Active';
const RESIZE_HANDLE_CLASSNAME = 'NgxEditor__ResizeHandle';

const createHandle = (direction: string): HTMLElement => {
  const handle = document.createElement('span');
  handle.className = `${RESIZE_HANDLE_CLASSNAME}--${direction}`;
  return handle;
};

class ImageRezieView {
  img: HTMLElement;
  dom: HTMLElement;
  handle: HTMLElement;

  constructor(node: ProsemirrorNode, view: EditorView, getPos: () => number) {
    const outer = document.createElement('span');
    outer.className = WRAPPER_CLASSNAME;
    outer.style.width = node.attrs.width;

    const handle = document.createElement('span');
    handle.className = RESIZE_HANDLE_CLASSNAME;

    const img = document.createElement('img');
    img.setAttribute('src', node.attrs.src);
    img.setAttribute('alt', node.attrs.alt ?? '');
    img.setAttribute('title', node.attrs.title ?? '');
    img.style.width = '100%';
    img.style.height = '100%';

    const handleBottomRight = createHandle('BR');
    const handleTopRight = createHandle('TL');
    const handleTopLeft = createHandle('TR');
    const handleBottomLeft = createHandle('BL');

    const resizePropoptionally = (evt: MouseEvent) => {
      evt.preventDefault();

      const { state, dispatch } = view;
      const { tr } = state;

      const startX = evt.pageX;
      const startWidth = img.clientWidth;

      const { width } = window.getComputedStyle(view.dom);
      const editorWidth = parseInt(width, 10);

      const onMouseMove = (e: MouseEvent) => {
        const currentX = e.pageX;
        const diffInPx = currentX - startX;
        const computedWidth = startWidth + diffInPx;

        // prevent image overflow the editor
        // prevent resizng below 20px
        if (computedWidth > editorWidth || computedWidth < 20) {
          return;
        }

        outer.style.width = `${computedWidth}px`;
      };

      const onMouseUp = (e: MouseEvent) => {
        e.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        const transaction = tr.setNodeMarkup(getPos(), null, {
          src: node.attrs.src,
          width: outer.style.width
        });

        const resolvedPos = transaction.doc.resolve(getPos());
        const newSelection = new NodeSelection(resolvedPos);

        transaction.setSelection(newSelection);
        dispatch(transaction);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    handleBottomRight.addEventListener('mousedown', resizePropoptionally, { once: true });
    handleTopRight.addEventListener('mousedown', resizePropoptionally, { once: true });
    handleTopLeft.addEventListener('mousedown', resizePropoptionally, { once: true });
    handleBottomLeft.addEventListener('mousedown', resizePropoptionally, { once: true });

    handle.appendChild(handleBottomRight);
    handle.appendChild(handleTopRight);
    handle.appendChild(handleTopLeft);
    handle.appendChild(handleBottomLeft);

    outer.appendChild(handle);
    outer.appendChild(img);

    this.dom = outer;
    this.img = img;
    this.handle = handle;
  }

  selectNode(): void {
    this.dom.classList.add(WRAPPER_RESIZE_ACTIVE_CLASSNAME);
    this.handle.style.display = 'block';
  }

  deselectNode(): void {
    this.dom.classList.remove(WRAPPER_RESIZE_ACTIVE_CLASSNAME);
    this.handle.style.display = 'none';
  }
}

const defaultOptions = {
  resize: true,
};

const imagePlugin = (opts = defaultOptions): Plugin => {
  const options = { ...defaultOptions, ...opts };

  return new Plugin({
    key: new PluginKey('link'),
    props: {
      nodeViews: {
        image: (node: ProsemirrorNode, view: EditorView, getPos: () => number) => {
          if (!options.resize) {
            return null;
          }
          return new ImageRezieView(node, view, getPos);
        },
      }
    }
  });
};

export default imagePlugin;
