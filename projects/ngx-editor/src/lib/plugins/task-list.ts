import { Node as ProseMirrorNode } from 'prosemirror-model';
import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorView, NodeView, ViewMutationRecord } from 'prosemirror-view';

// renders a checkbox in front of the item content, the checkbox
// is not part of the document and toggles the `checked` attribute
class TaskItemView implements NodeView {
  dom: HTMLLIElement;
  contentDOM: HTMLDivElement;

  private label: HTMLLabelElement;
  private checkbox: HTMLInputElement;

  constructor(
    private node: ProseMirrorNode,
    private view: EditorView,
    private getPos: () => number | undefined,
  ) {
    this.dom = document.createElement('li');
    this.dom.dataset['type'] = 'task_item';

    this.label = document.createElement('label');
    this.label.contentEditable = 'false';

    this.checkbox = document.createElement('input');
    this.checkbox.type = 'checkbox';
    this.checkbox.addEventListener('mousedown', this.onMouseDown);
    this.checkbox.addEventListener('click', this.onClick);
    this.label.append(this.checkbox);

    this.contentDOM = document.createElement('div');
    this.dom.append(this.label, this.contentDOM);

    this.render();
  }

  private render(): void {
    const checked = Boolean(this.node.attrs['checked']);
    this.dom.dataset['checked'] = String(checked);
    this.checkbox.checked = checked;
  }

  // keep the focus and selection in the editor
  private onMouseDown = (e: MouseEvent): void => {
    e.preventDefault();
  };

  private onClick = (e: MouseEvent): void => {
    const pos = this.getPos();

    if (!this.view.editable || pos === undefined) {
      e.preventDefault();
      return;
    }

    const { state, dispatch } = this.view;
    dispatch(state.tr.setNodeAttribute(pos, 'checked', !this.node.attrs['checked']));
  };

  update(node: ProseMirrorNode): boolean {
    if (node.type !== this.node.type) {
      return false;
    }

    this.node = node;
    this.render();
    return true;
  }

  stopEvent(e: Event): boolean {
    return this.label.contains(e.target as Node);
  }

  ignoreMutation(mutation: ViewMutationRecord): boolean {
    return this.label.contains(mutation.target);
  }

  destroy(): void {
    this.checkbox.removeEventListener('mousedown', this.onMouseDown);
    this.checkbox.removeEventListener('click', this.onClick);
  }
}

const taskListPlugin = (): Plugin => {
  return new Plugin({
    key: new PluginKey('task-list'),
    props: {
      nodeViews: {
        task_item: (node, view, getPos) => new TaskItemView(node, view, getPos),
      },
    },
  });
};

export default taskListPlugin;
