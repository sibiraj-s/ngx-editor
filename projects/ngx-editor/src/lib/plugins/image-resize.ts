import { ApplicationRef, ComponentRef, createComponent, Injector, OutputRefSubscription } from '@angular/core';
import { Node as ProseMirrorNode } from 'prosemirror-model';
import { NodeSelection, Plugin, PluginKey } from 'prosemirror-state';
import { EditorView, NodeView } from 'prosemirror-view';

import { ImageViewComponent } from '../components/image-view/image-view.component';

class ImageRezieView implements NodeView {
  dom: HTMLElement;
  view: EditorView;
  getPos: () => number;

  applicationRef: ApplicationRef;
  imageComponentRef: ComponentRef<ImageViewComponent>;
  resizeSubscription: OutputRefSubscription;

  node: ProseMirrorNode;
  updating = false;

  constructor(node: ProseMirrorNode, view: EditorView, getPos: () => number, injector: Injector) {
    this.applicationRef = injector.get(ApplicationRef);

    // create component ref
    this.imageComponentRef = createComponent(ImageViewComponent, {
      environmentInjector: this.applicationRef.injector,
    });

    // Attach to the view so that the change detector knows to run
    this.applicationRef.attachView(this.imageComponentRef.hostView);

    this.setNodeAttributes(node.attrs);
    this.imageComponentRef.setInput('view', view);

    this.dom = this.imageComponentRef.location.nativeElement;
    this.view = view;
    this.node = node;
    this.getPos = getPos;

    this.resizeSubscription = this.imageComponentRef.instance.imageResize.subscribe(() => {
      this.handleResize();
    });
  }

  private computeChanges(prevAttrs: Record<string, unknown>, newAttrs: Record<string, unknown>): boolean {
    return JSON.stringify(prevAttrs) === JSON.stringify(newAttrs);
  }

  private setNodeAttributes(attrs: Record<string, string>): void {
    this.imageComponentRef.setInput('src', attrs['src']);
    this.imageComponentRef.setInput('alt', attrs['alt']);
    this.imageComponentRef.setInput('title', attrs['title']);
    this.imageComponentRef.setInput('outerWidth', attrs['width']);
  }

  handleResize = (): void => {
    if (this.updating) {
      return;
    }

    const { state, dispatch } = this.view;
    const { tr } = state;

    const transaction = tr.setNodeMarkup(this.getPos(), undefined, {
      ...this.node.attrs,
      width: this.imageComponentRef.instance.outerWidth(),
    });

    const resolvedPos = transaction.doc.resolve(this.getPos());
    const newSelection = new NodeSelection(resolvedPos);

    transaction.setSelection(newSelection);
    dispatch(transaction);
  };

  update(node: ProseMirrorNode): boolean {
    if (node.type !== this.node.type) {
      return false;
    }

    this.node = node;

    const changed = this.computeChanges(this.node.attrs, node.attrs);
    if (changed) {
      this.updating = true;
      this.setNodeAttributes(node.attrs);
      this.updating = false;
    }
    return true;
  }

  ignoreMutation(): boolean {
    return true;
  }

  selectNode(): void {
    this.imageComponentRef.setInput('selected', true);
  }

  deselectNode(): void {
    this.imageComponentRef.setInput('selected', false);
  }

  destroy(): void {
    this.resizeSubscription.unsubscribe();
    this.applicationRef.detachView(this.imageComponentRef.hostView);
  }
}

const imageResizePlugin = (injector: Injector): Plugin => {
  return new Plugin({
    key: new PluginKey('image-resize'),
    props: {
      nodeViews: {
        image: (node: ProseMirrorNode, view: EditorView, getPos: () => number) => {
          return new ImageRezieView(node, view, getPos, injector);
        },
      },
    },
  });
};

export default imageResizePlugin;
