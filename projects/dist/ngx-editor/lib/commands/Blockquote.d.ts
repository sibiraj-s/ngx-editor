import { EditorState } from 'prosemirror-state';
import { Command } from 'prosemirror-commands';
declare class Blockqote {
    toggle(): Command;
    isActive(state: EditorState): boolean;
    canExecute(state: EditorState): boolean;
}
export default Blockqote;
//# sourceMappingURL=Blockquote.d.ts.map