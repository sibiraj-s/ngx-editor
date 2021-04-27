import { EditorState } from 'prosemirror-state';
import { Command } from 'prosemirror-commands';
declare class Mark {
    name: string;
    constructor(name: string);
    apply(): Command;
    toggle(): Command;
    isActive(state: EditorState): boolean;
    canExecute(state: EditorState): boolean;
}
export default Mark;
//# sourceMappingURL=Mark.d.ts.map