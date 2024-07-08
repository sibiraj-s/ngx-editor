import type { MarkType } from 'prosemirror-model';
import type { EditorState, Command } from 'prosemirror-state';
import { toggleMark } from 'prosemirror-commands';

import { isMarkActive } from 'ngx-editor/helpers';
import { removeLink } from 'ngx-editor/commands';
import type { Dispatch } from './types';

const defaultOptions = {
  strict: true,
};

export interface LinkAttrs {
  href: string;
  title?: string;
  target?: string;
}

class Link {
  update(attrs: LinkAttrs): Command {
    return (state: EditorState, dispatch?: Dispatch): boolean => {
      const { schema, selection } = state;

      const type: MarkType = schema.marks['link'];
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
    return (state: EditorState, dispatch?: Dispatch): boolean => {
      const { schema, tr } = state;

      const type: MarkType = schema.marks['link'];
      if (!type) {
        return false;
      }

      const linkAttrs: LinkAttrs = {
        href: attrs.href,
        title: attrs.title ?? text,
        target: attrs.target ?? '_blank',
      };

      const node = schema.text(text, [schema.marks['link'].create(linkAttrs)]);

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
    const type = schema.marks['link'];

    if (!type) {
      return false;
    }

    return isMarkActive(state, type);
  }

  remove(state: EditorState, dispatch?: Dispatch): boolean {
    return removeLink()(state, dispatch);
  }

  canExecute(state: EditorState): boolean {
    const testAttrs: LinkAttrs = {
      href: '',
    };

    return this.insert('Exec', testAttrs)(state) || this.update(testAttrs)(state);
  }
}

export default Link;
