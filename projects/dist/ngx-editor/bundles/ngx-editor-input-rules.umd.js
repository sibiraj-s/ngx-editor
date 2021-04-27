(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('prosemirror-inputrules')) :
    typeof define === 'function' && define.amd ? define('ngx-editor/input-rules', ['exports', 'prosemirror-inputrules'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global['ngx-editor'] = global['ngx-editor'] || {}, global['ngx-editor']['input-rules'] = {}), global.prosemirrorInputrules));
}(this, (function (exports, prosemirrorInputrules) { 'use strict';

    // automatically convert text to link while typing
    var autoLink = function () {
        var urlRegEx = /((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)$/;
        return new prosemirrorInputrules.InputRule(urlRegEx, function (state, match, start, end) {
            var schema = state.schema;
            var tr = state.tr.insertText(match[0], start, end); // Replace existing text with entire match
            var mark = schema.marks.link.create({ href: match[0] });
            return tr.addMark(start, start + match[0].length, mark);
        });
    };

    /**
     * Generated bundle index. Do not edit.
     */

    exports.autoLink = autoLink;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-editor-input-rules.umd.js.map
