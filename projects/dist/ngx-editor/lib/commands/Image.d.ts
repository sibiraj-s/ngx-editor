import { EditorState } from 'prosemirror-state';
import { Command } from 'prosemirror-commands';
export interface ImageAttrs {
    alt?: string;
    title?: string;
    width?: string;
}
declare class Image {
    insert(src: string, attrs: ImageAttrs): Command;
    isActive(state: EditorState): boolean;
}
export default Image;
//# sourceMappingURL=Image.d.ts.map