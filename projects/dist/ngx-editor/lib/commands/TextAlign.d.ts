import { EditorState } from 'prosemirror-state';
import { Command } from 'prosemirror-commands';
export declare type Align = 'left' | 'center' | 'right' | 'justify';
declare class TextAlign {
    align: string;
    constructor(align: Align);
    toggle(): Command;
    isActive(state: EditorState): boolean;
    canExecute(state: EditorState): boolean;
}
export default TextAlign;
//# sourceMappingURL=TextAlign.d.ts.map