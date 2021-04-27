import { EditorState } from 'prosemirror-state';
import { Command } from 'prosemirror-commands';
export declare type HeadingLevels = 1 | 2 | 3 | 4 | 5 | 6;
declare class Heading {
    level: number;
    constructor(level: HeadingLevels);
    apply(): Command;
    toggle(): Command;
    isActive(state: EditorState): boolean;
    canExecute(state: EditorState): boolean;
}
export default Heading;
//# sourceMappingURL=Heading.d.ts.map