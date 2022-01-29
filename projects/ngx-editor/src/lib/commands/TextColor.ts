import { MarkType } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { Command } from 'prosemirror-commands';

import { getSelectionMarks, isMarkActive } from 'ngx-editor/helpers';
import { applyMark, removeMark } from 'ngx-editor/commands';

import { Dispatch } from './types';

type Name = 'text_color' | 'text_background_color';
type AttrName = 'color' | 'backgroundColor';

interface ColorAttrs {
  color: string;
}

interface BackgroundColorAttrs {
  backgroundColor: string;
}

class TextColor {
  name: Name;
  attrName: AttrName;

  constructor(name: Name, attrName: AttrName = 'color') {
    this.name = name;
    this.attrName = attrName
  }

  apply(attrs: ColorAttrs | BackgroundColorAttrs): Command {
    return (state: EditorState, dispatch?: Dispatch): boolean => {
      const { schema, selection, doc } = state;

      const type: MarkType = schema.marks[this.name];
      if (!type) {
        return false;
      }

      const { from, to, empty } = selection;

      if (!empty && (from + 1 === to)) {
        const node = doc.nodeAt(from);
        if (node?.isAtom && !node.isText && node.isLeaf) {
          // An atomic node (e.g. Image) is selected.
          return false;
        }
      }

      return applyMark(type, attrs)(state, dispatch);
    };
  }

  isActive(state: EditorState): boolean {
    const { schema } = state;
    const type: MarkType = schema.marks[this.name];

    if (!type) {
      return false;
    }

    return isMarkActive(state, type);
  }

  getActiveColors(state: EditorState): string[] {
    if (!this.isActive(state)) {
      return [];
    }

    const { schema } = state;
    const marks = getSelectionMarks(state);

    const colors = marks
      .filter(mark => mark.type === schema.marks[this.name])
      .map(mark => {
        return mark.attrs[this.attrName]
      })
      .filter(Boolean);

    return colors;
  }

  remove(): Command {
    return (state: EditorState, dispatch?: Dispatch): boolean => {
      const { schema } = state;

      const type = schema.marks[this.name];
      if (!type) {
        return false;
      }

      return removeMark(type)(state, dispatch);
    };
  }

  canExecute(state: EditorState): boolean {
    const attrs = this.name === 'text_color' ? { color: '' } : { backgroundColor: '' };
    return this.apply(attrs)(state);
  }
}

export default TextColor;
