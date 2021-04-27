import { InputRule } from 'prosemirror-inputrules';

// automatically convert text to link while typing
const autoLink = () => {
    const urlRegEx = /((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)$/;
    return new InputRule(urlRegEx, (state, match, start, end) => {
        const { schema } = state;
        const tr = state.tr.insertText(match[0], start, end); // Replace existing text with entire match
        const mark = schema.marks.link.create({ href: match[0] });
        return tr.addMark(start, start + match[0].length, mark);
    });
};

/**
 * Generated bundle index. Do not edit.
 */

export { autoLink };
//# sourceMappingURL=ngx-editor-input-rules.js.map
