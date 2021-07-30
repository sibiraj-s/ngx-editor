import {
  MarkType
} from 'prosemirror-model';
import {
  EditorState
} from 'prosemirror-state';
import {
  Command} from 'prosemirror-commands';

import {
  isNodeActive
} from 'ngx-editor/helpers';
import {
  removeLink
} from 'ngx-editor/commands';
import {
  Dispatch
} from './types';

const defaultOptions = {
  strict: true
};

class HorizontalRule {
  update(): Command {
    return (state: EditorState, dispatch ? : Dispatch): boolean => {
      const {
        schema,
        selection
      } = state;

      const type: MarkType = schema.marks.horizontal_rule;
      if (!type) {
        return false;
        }
        
        if (selection.empty) {
            return true;
        }

      return true;
    };
  }

  insert(): Command {
    return (state: EditorState, dispatch ? : Dispatch): boolean => {
      const {
        schema,
        tr
      } = state;

      const type: MarkType = schema.nodes.horizontal_rule;
      if (!type) {
        return false;
      }
      const node = schema.node('horizontal_rule');

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

    const {
      schema
    } = state;
    return isNodeActive(state, schema.nodes.horizontal_rule);
  }

    remove(state: EditorState, dispatch?: Dispatch): boolean {
        // I think there is nothing to do here...
        return true;
        return removeLink()(state, dispatch);
  }

  canExecute(state: EditorState): boolean {
    return this.update()(state);
  }
}

export default HorizontalRule;
