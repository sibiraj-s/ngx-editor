import { NodeType, Node as ProsemirrorNode } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { setBlockType } from 'prosemirror-commands';

import { getSelectionNodes } from 'ngx-editor/helpers';

type Level = 1 | 2 | 3 | 4 | 5 | 6;

class Heading {
  level: number;

  constructor(level: Level) {
    this.level = level;
  }

  execute(state: EditorState, dispatch?: (tr: Transaction) => void): boolean {
    const { schema, selection, doc } = state;

    const type: NodeType = schema.nodes.heading;
    if (!type) {
      return false;
    }

    const nodePos = selection.$from.before(1);
    const node = doc.nodeAt(nodePos);

    if (this.isActive(state)) {
      return setBlockType(schema.nodes.paragraph, node.attrs)(state, dispatch);
    }

    return setBlockType(type, { ...node.attrs, level: this.level })(state, dispatch);
  }

  isActive(state: EditorState): boolean {
    const { schema } = state;
    const nodes = getSelectionNodes(state);

    const type: NodeType = schema.nodes.heading;
    if (!type) {
      return false;
    }

    // heading is a text node
    // don't mark as active when it has more nodes
    const unSupportedNodes = nodes.filter(node => {
      return ![type, schema.nodes.text].includes(node.type);
    });

    if (unSupportedNodes.length) {
      return false;
    }

    const acitveNode = nodes.find((node: ProsemirrorNode) => {
      return node.attrs.level === this.level;
    });

    return Boolean(acitveNode);
  }

  canExecute(state: EditorState): boolean {
    return this.execute(state, null);
  }
}

export default Heading;
