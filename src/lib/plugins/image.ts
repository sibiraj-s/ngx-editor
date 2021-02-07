import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injector } from '@angular/core';
import { Node as ProseMirrorNode } from 'prosemirror-model';
import { NodeSelection, Plugin, PluginKey } from 'prosemirror-state';
import { EditorView, NodeView } from 'prosemirror-view';
import { Subscription } from 'rxjs';

import { ImageViewComponent } from '../components/image-view/image-view.component';

class ImageRezieView implements NodeView {
  img: HTMLElement;
  dom: HTMLElement;
  handle: HTMLElement;
  view: EditorView;
  getPos: () => number;

  applicationRef: ApplicationRef;
  imageComponentRef: ComponentRef<ImageViewComponent>;
  resizeSubscription: Subscription;

  constructor(node: ProseMirrorNode, view: EditorView, getPos: () => number, injector: Injector) {
    const dom = document.createElement('image-view');

    const componentFactoryResolver = injector.get(ComponentFactoryResolver);
    this.applicationRef = injector.get(ApplicationRef);

    // Create the component and wire it up with the element
    const factory = componentFactoryResolver.resolveComponentFactory(
      ImageViewComponent
    );

    this.imageComponentRef = factory.create(injector, [], dom);
    // Attach to the view so that the change detector knows to run
    this.applicationRef.attachView(this.imageComponentRef.hostView);

    this.imageComponentRef.instance.src = node.attrs.src;
    this.imageComponentRef.instance.alt = node.attrs.alt;
    this.imageComponentRef.instance.title = node.attrs.title;
    this.imageComponentRef.instance.outerWidth = node.attrs.width;
    this.imageComponentRef.instance.view = view;

    this.dom = dom;
    this.view = view;
    this.getPos = getPos;

    this.resizeSubscription = this.imageComponentRef.instance.imageResize.subscribe(() => {
      this.handleResize();
    });
  }

  handleResize = (): void => {
    const { state, dispatch } = this.view;
    const { tr } = state;

    const transaction = tr.setNodeMarkup(this.getPos(), undefined, {
      src: this.imageComponentRef.instance.src,
      width: this.imageComponentRef.instance.outerWidth
    });

    const resolvedPos = transaction.doc.resolve(this.getPos());
    const newSelection = new NodeSelection(resolvedPos);

    transaction.setSelection(newSelection);
    dispatch(transaction);
  }

  update(): boolean {
    return true;
  }

  ignoreMutation(): boolean {
    return true;
  }

  selectNode(): void {
    this.imageComponentRef.instance.selected = true;
  }

  deselectNode(): void {
    this.imageComponentRef.instance.selected = false;
  }

  destroy(): void {
    this.resizeSubscription.unsubscribe();
    this.applicationRef.detachView(this.imageComponentRef.hostView);
  }
}

const imagePlugin = (injector: Injector): Plugin => {

  return new Plugin({
    key: new PluginKey('link'),
    props: {
      nodeViews: {
        image: (node: ProseMirrorNode, view: EditorView, getPos: () => number) => {
          return new ImageRezieView(node, view, getPos, injector);
        },
      }
    }
  });
};

export default imagePlugin;
