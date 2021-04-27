const isMarkActive = (state, type) => {
    const { from, $from, to, empty } = state.selection;
    if (empty) {
        return !!type.isInSet(state.storedMarks || $from.marks());
    }
    else {
        return state.doc.rangeHasMark(from, to, type);
    }
};

const getSelectionMarks = (state) => {
    let marks = [];
    const { selection: { from, to, empty, $from }, storedMarks } = state;
    if (empty) {
        marks = storedMarks || $from.marks();
    }
    else {
        state.doc.nodesBetween(from, to, node => {
            marks = [...marks, ...node.marks];
        });
    }
    return marks;
};

const isLinkActive = (state) => {
    const { schema, selection: { anchor, head, from, to } } = state;
    if (!schema.marks.link) {
        return false;
    }
    const isForwardSelection = anchor === from;
    const linkMarks = getSelectionMarks(state).filter(mark => mark.type === schema.marks.link);
    if (!linkMarks.length) {
        return false;
    }
    const selectionHasOnlyMarks = isForwardSelection ?
        (state.doc.rangeHasMark(anchor, anchor + 1, schema.marks.link) &&
            state.doc.rangeHasMark(head - 1, head, schema.marks.link)) : (state.doc.rangeHasMark(anchor - 1, anchor, schema.marks.link) &&
        state.doc.rangeHasMark(head, head + 1, schema.marks.link));
    if (linkMarks.length === 1 && selectionHasOnlyMarks) {
        return true;
    }
    return false;
};

const findNodeType = (type, $from) => {
    for (let i = $from.depth; i > 0; i--) {
        if ($from.node(i).type === type) {
            return $from.node(i).type;
        }
    }
    return null;
};
const isNodeActive = (state, type, attrs = {}) => {
    const { selection } = state;
    const { $from, to } = selection;
    const node = findNodeType(type, $from);
    if (!Object.entries(attrs).length || !node) {
        return !!node;
    }
    return to <= $from.end() && $from.parent.hasMarkup(type, attrs);
};

const calculateTooltipPos = (view) => {
    const { state: { selection } } = view;
    const { from, to } = selection;
    // These are in screen coordinates
    const start = view.coordsAtPos(from);
    const end = view.coordsAtPos(to);
    // The box in which the tooltip is positioned, to use as base
    const box = view.dom.getBoundingClientRect();
    // Find a center-ish x position from the selection endpoints (when
    // crossing lines, end may be more to the left)
    const left = Math.max((start.left + end.left) / 2, start.left + 3);
    return {
        left: left - box.left,
        bottom: box.bottom - start.top
    };
};

const getSelectionNodes = (state) => {
    const nodes = [];
    const { selection: { from, to } } = state;
    state.doc.nodesBetween(from, to, node => {
        nodes.push(node);
    });
    return nodes;
};

// Ref: https://github.com/ProseMirror/prosemirror-commands/blob/master/src/commands.js
const markApplies = (doc, ranges, type) => {
    for (const range of ranges) {
        const { $from, $to } = range;
        let canApply = $from.depth === 0 ? doc.type.allowsMarkType(type) : false;
        doc.nodesBetween($from.pos, $to.pos, (node) => {
            if (canApply) {
                return false;
            }
            canApply = node.inlineContent && node.type.allowsMarkType(type);
            return true;
        });
        if (canApply) {
            return true;
        }
    }
    return false;
};

/**
 * Generated bundle index. Do not edit.
 */

export { calculateTooltipPos, getSelectionMarks, getSelectionNodes, isLinkActive, isMarkActive, isNodeActive, markApplies };
//# sourceMappingURL=ngx-editor-helpers.js.map
