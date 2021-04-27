(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('prosemirror-schema-list'), require('ngx-editor/utils'), require('prosemirror-model')) :
    typeof define === 'function' && define.amd ? define('ngx-editor/schema', ['exports', 'prosemirror-schema-list', 'ngx-editor/utils', 'prosemirror-model'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global['ngx-editor'] = global['ngx-editor'] || {}, global['ngx-editor'].schema = {}), global.prosemirrorSchemaList, global['ngx-editor'].utils, global.prosemirrorModel));
}(this, (function (exports, sl, utils, prosemirrorModel) { 'use strict';

    // :: MarkSpec A link. Has `href` and `title` attributes. `title`
    // defaults to the empty string. Rendered and parsed as an `<a>`
    // element.
    var link = {
        attrs: {
            href: {},
            title: { default: null },
            target: { default: '_blank' }
        },
        inclusive: false,
        parseDOM: [
            {
                tag: 'a[href]',
                getAttrs: function (dom) {
                    return {
                        href: dom.getAttribute('href'),
                        title: dom.getAttribute('title'),
                        target: dom.getAttribute('target'),
                    };
                }
            }
        ],
        toDOM: function (node) {
            var _a = node.attrs, href = _a.href, title = _a.title, target = _a.target;
            return ['a', { href: href, title: title, target: target }, 0];
        }
    };
    // :: MarkSpec An emphasis mark. Rendered as an `<em>` element.
    // Has parse rules that also match `<i>` and `font-style: italic`.
    var em = {
        parseDOM: [
            { tag: 'i' },
            { tag: 'em' },
            { style: 'font-style=italic' }
        ],
        toDOM: function () {
            return ['em', 0];
        }
    };
    // :: MarkSpec A strong mark. Rendered as `<strong>`, parse rules
    // also match `<b>` and `font-weight: bold`.
    var strong = {
        parseDOM: [
            { tag: 'strong' },
            // This works around a Google Docs misbehavior where
            // pasted content will be inexplicably wrapped in `<b>`
            // tags with a font-weight normal.
            {
                tag: 'b',
                getAttrs: function (dom) {
                    return dom.style.fontWeight !== 'normal' && null;
                },
            },
            {
                style: 'font-weight',
                getAttrs: function (value) {
                    return /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null;
                }
            }
        ],
        toDOM: function () {
            return ['strong', 0];
        }
    };
    // :: MarkSpec Code font mark. Represented as a `<code>` element.
    var code = {
        parseDOM: [
            { tag: 'code' }
        ],
        toDOM: function () {
            return ['code', 0];
        }
    };
    // :: MarkSpec An underline mark. Rendered as an `<u>` element.
    // Has parse rules that also match `text-decoration: underline`.
    var u = {
        parseDOM: [
            { tag: 'u' },
            { style: 'text-decoration=underline' }
        ],
        toDOM: function () {
            return ['u', 0];
        }
    };
    // :: MarkSpec An underline mark. Rendered as an `<s>` element.
    // Has parse rules that also match `strike`, `del` tag and css property `text-decoration: line-through`.
    var s = {
        parseDOM: [
            { tag: 's' },
            { tag: 'strike' },
            { style: 'text-decoration=line-through' }
        ],
        toDOM: function () {
            return ['s', 0];
        }
    };
    var textColor = {
        attrs: {
            color: {
                default: null
            },
        },
        parseDOM: [
            {
                style: 'color',
                getAttrs: function (value) {
                    return { color: value };
                }
            }
        ],
        toDOM: function (mark) {
            var color = mark.attrs.color;
            return ['span', { style: "color:" + color + ";" }, 0];
        },
    };
    var textBackgroundColor = {
        attrs: {
            backgroundColor: {
                default: null
            },
        },
        parseDOM: [
            {
                style: 'background-color',
                getAttrs: function (value) {
                    return { backgroundColor: value };
                }
            }
        ],
        toDOM: function (mark) {
            var backgroundColor = mark.attrs.backgroundColor;
            return ['span', { style: "background-color:" + backgroundColor + ";" }, 0];
        },
    };
    var marks = {
        link: link,
        em: em,
        strong: strong,
        code: code,
        u: u,
        s: s,
        text_color: textColor,
        text_background_color: textBackgroundColor
    };

    var doc = {
        content: 'block+'
    };
    // :: NodeSpec The text node.
    var text = {
        group: 'inline'
    };
    // :: NodeSpec A plain paragraph textblock. Represented in the DOM
    // as a `<p>` element.
    var paragraph = {
        content: 'inline*',
        group: 'block',
        attrs: {
            align: {
                default: null,
            }
        },
        parseDOM: [
            {
                tag: 'p',
                getAttrs: function (dom) {
                    var textAlign = dom.style.textAlign;
                    var align = dom.getAttribute('align') || textAlign || null;
                    return {
                        align: align
                    };
                }
            }
        ],
        toDOM: function (node) {
            var align = node.attrs.align;
            var styles = {
                textAlign: align !== 'left' ? align : null
            };
            var style = utils.toStyleString(styles) || null;
            return ['p', { style: style }, 0];
        }
    };
    // :: NodeSpec A blockquote (`<blockquote>`) wrapping one or more blocks.
    var blockquote = {
        content: 'block+',
        group: 'block',
        defining: true,
        parseDOM: [{ tag: 'blockquote' }],
        toDOM: function () {
            return ['blockquote', 0];
        }
    };
    // :: NodeSpec A horizontal rule (`<hr>`).
    var horizontalRule = {
        group: 'block',
        parseDOM: [{ tag: 'hr' }],
        toDOM: function () {
            return ['hr'];
        }
    };
    // :: NodeSpec A heading textblock, with a `level` attribute that
    // should hold the number 1 to 6. Parsed and serialized as `<h1>` to
    // `<h6>` elements.
    var heading = {
        attrs: {
            level: {
                default: 1
            },
            align: {
                default: null,
            }
        },
        content: 'inline*',
        group: 'block',
        defining: true,
        parseDOM: [
            {
                tag: 'h1',
                getAttrs: function (dom) {
                    var textAlign = dom.style.textAlign;
                    var align = dom.getAttribute('align') || textAlign || null;
                    return {
                        level: 1,
                        align: align
                    };
                }
            },
            {
                tag: 'h2',
                getAttrs: function (dom) {
                    var textAlign = dom.style.textAlign;
                    var align = dom.getAttribute('align') || textAlign || null;
                    return {
                        level: 2,
                        align: align
                    };
                }
            },
            {
                tag: 'h3',
                getAttrs: function (dom) {
                    var textAlign = dom.style.textAlign;
                    var align = dom.getAttribute('align') || textAlign || null;
                    return {
                        level: 3,
                        align: align
                    };
                }
            },
            {
                tag: 'h4',
                getAttrs: function (dom) {
                    var textAlign = dom.style.textAlign;
                    var align = dom.getAttribute('align') || textAlign || null;
                    return {
                        level: 4,
                        align: align
                    };
                }
            },
            {
                tag: 'h5',
                getAttrs: function (dom) {
                    var textAlign = dom.style.textAlign;
                    var align = dom.getAttribute('align') || textAlign || null;
                    return {
                        level: 5,
                        align: align
                    };
                }
            },
            {
                tag: 'h6',
                getAttrs: function (dom) {
                    var textAlign = dom.style.textAlign;
                    var align = dom.getAttribute('align') || textAlign || null;
                    return {
                        level: 6,
                        align: align
                    };
                }
            },
        ],
        toDOM: function (node) {
            var _a = node.attrs, level = _a.level, align = _a.align;
            var styles = {
                textAlign: align !== 'left' ? align : null
            };
            var style = utils.toStyleString(styles) || null;
            return ['h' + level, { style: style }, 0];
        }
    };
    // :: NodeSpec A code listing. Disallows marks or non-text inline
    // nodes by default. Represented as a `<pre>` element with a
    // `<code>` element inside of it.
    var codeBlock = {
        content: 'text*',
        marks: '',
        group: 'block',
        code: true,
        defining: true,
        parseDOM: [
            {
                tag: 'pre',
                preserveWhitespace: 'full'
            }
        ],
        toDOM: function () {
            return ['pre', ['code', 0]];
        }
    };
    // :: NodeSpec A hard line break, represented in the DOM as `<br>`.
    var hardBreak = {
        inline: true,
        group: 'inline',
        selectable: false,
        parseDOM: [{ tag: 'br' }],
        toDOM: function () {
            return ['br'];
        }
    };
    // :: NodeSpec An inline image (`<img>`) node. Supports `src`,
    // `alt`, and `href` attributes. The latter two default to the empty
    // string.
    var image = {
        inline: true,
        attrs: {
            src: {},
            alt: { default: null },
            title: { default: null },
            width: { default: null }
        },
        group: 'inline',
        draggable: true,
        parseDOM: [
            {
                tag: 'img[src]',
                getAttrs: function (dom) {
                    return {
                        src: dom.getAttribute('src'),
                        title: dom.getAttribute('title'),
                        alt: dom.getAttribute('alt'),
                        width: dom.getAttribute('width')
                    };
                }
            }
        ],
        toDOM: function (node) {
            var _a = node.attrs, src = _a.src, alt = _a.alt, title = _a.title, width = _a.width;
            return ['img', { src: src, alt: alt, title: title, width: width }];
        }
    };
    var listItem = Object.assign(Object.assign({}, sl.listItem), { content: 'paragraph block*' });
    var orderedList = Object.assign(Object.assign({}, sl.orderedList), { content: 'list_item+', group: 'block' });
    var bulletList = Object.assign(Object.assign({}, sl.bulletList), { content: 'list_item+', group: 'block' });
    var nodes = {
        doc: doc,
        text: text,
        paragraph: paragraph,
        blockquote: blockquote,
        horizontal_rule: horizontalRule,
        heading: heading,
        hard_break: hardBreak,
        code_block: codeBlock,
        image: image,
        list_item: listItem,
        ordered_list: orderedList,
        bullet_list: bulletList
    };

    var schema = new prosemirrorModel.Schema({
        marks: marks,
        nodes: nodes
    });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.marks = marks;
    exports.nodes = nodes;
    exports.schema = schema;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-editor-schema.umd.js.map
