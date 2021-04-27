import { EditorState } from 'prosemirror-state';
import { Command } from 'prosemirror-commands';
declare type Name = 'text_color' | 'text_background_color';
interface ColorAttrs {
    color: string;
}
interface BackgroundColorAttrs {
    backgroundColor: string;
}
declare class TextColor {
    name: Name;
    constructor(name: Name);
    apply(attrs: ColorAttrs | BackgroundColorAttrs): Command;
    isActive(state: EditorState): boolean;
    getActiveColors(state: EditorState): string[];
    remove(): Command;
    canExecute(state: EditorState): boolean;
}
export default TextColor;
//# sourceMappingURL=TextColor.d.ts.map