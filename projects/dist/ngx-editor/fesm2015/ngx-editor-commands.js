import { TextSelection } from 'prosemirror-state';
import { markApplies } from 'ngx-editor/helpers';

const removeLink = () => {
    return (state, dispatch) => {
        const { doc, selection, tr } = state;
        const { $head: { pos }, from, to } = selection;
        // if the cursor is on the link without any selection
        if (from === to) {
            const $pos = doc.resolve(pos);
            const linkStart = pos - $pos.textOffset;
            const linkEnd = linkStart + $pos.parent.child($pos.index()).nodeSize;
            tr.removeMark(linkStart, linkEnd);
        }
        else {
            tr.removeMark(from, to);
        }
        if (!tr.docChanged) {
            return false;
        }
        dispatch === null || dispatch === void 0 ? void 0 : dispatch(tr);
        return true;
    };
};

// Ref: https://github.com/ProseMirror/prosemirror-commands/blob/master/src/commands.js
const applyMark = (type, attrs = {}) => {
    return (state, dispatch) => {
        const { tr, selection } = state;
        const { empty, ranges, $from, $to } = selection;
        if (empty && selection instanceof TextSelection) {
            const { $cursor } = selection;
            if (!$cursor || !markApplies(state.doc, ranges, type)) {
                return false;
            }
            tr.addStoredMark(type.create(attrs));
            if (!tr.storedMarksSet) {
                return false;
            }
            dispatch === null || dispatch === void 0 ? void 0 : dispatch(tr);
        }
        else {
            tr.addMark($from.pos, $to.pos, type.create(attrs));
            if (!tr.docChanged) {
                return false;
            }
            dispatch === null || dispatch === void 0 ? void 0 : dispatch(tr.scrollIntoView());
        }
        return true;
    };
};

const removeMark = (type) => {
    return (state, dispatch) => {
        const { tr, selection, storedMarks, doc } = state;
        const { empty, ranges } = selection;
        if (empty && selection instanceof TextSelection) {
            const { $cursor } = selection;
            if (!$cursor || !markApplies(state.doc, ranges, type)) {
                return false;
            }
            if (type.isInSet(storedMarks || $cursor.marks())) {
                tr.removeStoredMark(type);
                dispatch === null || dispatch === void 0 ? void 0 : dispatch(tr);
                return true;
            }
        }
        else {
            for (const range of ranges) {
                const { $from, $to } = range;
                const hasMark = doc.rangeHasMark($from.pos, $to.pos, type);
                if (hasMark) {
                    tr.removeMark($from.pos, $to.pos, type);
                }
            }
            if (!tr.docChanged) {
                return false;
            }
            dispatch === null || dispatch === void 0 ? void 0 : dispatch(tr.scrollIntoView());
        }
        return false;
    };
};

/**
 * Generated bundle index. Do not edit.
 */

export { applyMark, removeLink, removeMark };
//# sourceMappingURL=ngx-editor-commands.js.map
