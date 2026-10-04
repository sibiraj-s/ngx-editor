import type { NodeType, Node as ProseMirrorNode } from 'prosemirror-model';
import type { EditorState, Transaction, Command } from 'prosemirror-state';
import { setBlockType } from 'prosemirror-commands';

import { getSelectionNodes } from 'ngx-editor/helpers';

import { setBlockTypeWithAttrs } from './blockType';
import { ToggleCommand } from './types';

export type HeadingLevels = 1 | 2 | 3 | 4 | 5 | 6;

class Heading implements ToggleCommand {
  level: number;

  constructor(level: HeadingLevels) {
    this.level = level;
  }

  apply(): Command {
    return (state: EditorState, dispatch?: (tr: Transaction) => void): boolean => {
      const { schema } = state;

      const type: NodeType = schema.nodes['heading'];
      if (!type) {
        return false;
      }

      return setBlockType(type)(state, dispatch);
    };
  }

  toggle(): Command {
    return (state: EditorState, dispatch?: (tr: Transaction) => void): boolean => {
      const { schema } = state;

      const type: NodeType = schema.nodes['heading'];
      if (!type) {
        return false;
      }

      // keep attributes like align and indent of each converted block
      if (this.isActive(state)) {
        return setBlockTypeWithAttrs(schema.nodes['paragraph'], (node) => node.attrs)(state, dispatch);
      }

      return setBlockTypeWithAttrs(type, (node) => ({ ...node.attrs, level: this.level }))(state, dispatch);
    };
  }

  isActive(state: EditorState): boolean {
    const { schema } = state;
    const nodesInSelection = getSelectionNodes(state);

    const type: NodeType = schema.nodes['heading'];
    if (!type) {
      return false;
    }

    const supportedNodes = [
      type,
      schema.nodes['text'],
      schema.nodes['blockquote'],
    ];

    // heading is a text node
    // don't mark as active when it has more nodes
    const nodes = nodesInSelection.filter((node) => {
      return supportedNodes.includes(node.type);
    });

    const acitveNode = nodes.find((node: ProseMirrorNode) => {
      return node.attrs['level'] === this.level;
    });

    return Boolean(acitveNode);
  }

  canExecute(state: EditorState): boolean {
    return this.toggle()(state);
  }
}

export default Heading;
