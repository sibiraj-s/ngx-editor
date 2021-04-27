import { EditorState } from 'prosemirror-state';
import { Command } from 'prosemirror-commands';
import { Dispatch } from './types';
export interface LinkAttrs {
    href: string;
    title?: string;
    target?: string;
}
declare class Link {
    update(attrs?: {}): Command;
    insert(text: string, attrs: LinkAttrs): Command;
    isActive(state: EditorState, options?: {
        strict: boolean;
    }): boolean;
    remove(state: EditorState, dispatch?: Dispatch): boolean;
    canExecute(state: EditorState): boolean;
}
export default Link;
//# sourceMappingURL=Link.d.ts.map