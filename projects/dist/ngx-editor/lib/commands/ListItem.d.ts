import { NodeType, Schema } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { Command } from 'prosemirror-commands';
declare class ListItem {
    isBulletList: boolean;
    constructor(isBulletList?: boolean);
    getType(schema: Schema): NodeType;
    toggle(): Command;
    isActive(state: EditorState): boolean;
    canExecute(state: EditorState): boolean;
}
export default ListItem;
//# sourceMappingURL=ListItem.d.ts.map