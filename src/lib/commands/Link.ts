import { Command, toggleMark } from 'prosemirror-commands';
import { MarkType } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';

import { isMarkActive } from 'ngx-editor/helpers';
import { removeLink } from 'ngx-editor/commands';
import { Dispatch } from './types';

const defaultOptions = {
  strict: true
};

export interface LinkAttrs {
  href: string;
  title?: string;
  target?: string;
}

class Link {
  update(attrs = {}): Command {
    return (state: EditorState, dispatch: Dispatch): boolean => {
      const { schema, selection } = state;

      const type: MarkType = schema.marks.link;
      if (!type) {
        return false;
      }

      if (selection.empty) {
        return false;
      }

      return toggleMark(type, attrs)(state, dispatch);
    };
  }

  insert(text: string, attrs: LinkAttrs): Command {
    return (state: EditorState, dispatch: Dispatch): boolean => {
      const { schema, tr } = state;

      const type: MarkType = schema.marks.link;
      if (!type) {
        return false;
      }

      const linkAttrs: LinkAttrs = {
        href: attrs.href,
        title: attrs.title ?? text,
        target: attrs.target ?? '_blank'
      };

      const node = schema.text(text, [schema.marks.link.create(linkAttrs)]);

      tr.replaceSelectionWith(node, false)
        .scrollIntoView();

      if (tr.docChanged) {
        dispatch?.(tr);
        return true;
      }

      return false;
    };
  }

  isActive(state: EditorState, options = defaultOptions): boolean {
    if (options.strict) {
      return true;
    }

    const { schema } = state;
    return isMarkActive(state, schema.marks.link);
  }

  remove(state: EditorState, dispatch?: Dispatch): boolean {
    return removeLink()(state, dispatch);
  }

  canExecute(state: EditorState): boolean {
    return this.update({})(state, null);
  }
}

export default Link;
