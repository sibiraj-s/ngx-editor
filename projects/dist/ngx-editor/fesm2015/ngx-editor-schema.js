import { listItem as listItem$1, orderedList as orderedList$1, bulletList as bulletList$1 } from 'prosemirror-schema-list';
import { toStyleString } from 'ngx-editor/utils';
import { Schema } from 'prosemirror-model';

// :: MarkSpec A link. Has `href` and `title` attributes. `title`
// defaults to the empty string. Rendered and parsed as an `<a>`
// element.
const link = {
    attrs: {
        href: {},
        title: { default: null },
        target: { default: '_blank' }
    },
    inclusive: false,
    parseDOM: [
        {
            tag: 'a[href]',
            getAttrs(dom) {
                return {
                    href: dom.getAttribute('href'),
                    title: dom.getAttribute('title'),
                    target: dom.getAttribute('target'),
                };
            }
        }
    ],
    toDOM(node) {
        const { href, title, target } = node.attrs;
        return ['a', { href, title, target }, 0];
    }
};
// :: MarkSpec An emphasis mark. Rendered as an `<em>` element.
// Has parse rules that also match `<i>` and `font-style: italic`.
const em = {
    parseDOM: [
        { tag: 'i' },
        { tag: 'em' },
        { style: 'font-style=italic' }
    ],
    toDOM() {
        return ['em', 0];
    }
};
// :: MarkSpec A strong mark. Rendered as `<strong>`, parse rules
// also match `<b>` and `font-weight: bold`.
const strong = {
    parseDOM: [
        { tag: 'strong' },
        // This works around a Google Docs misbehavior where
        // pasted content will be inexplicably wrapped in `<b>`
        // tags with a font-weight normal.
        {
            tag: 'b',
            getAttrs: (dom) => {
                return dom.style.fontWeight !== 'normal' && null;
            },
        },
        {
            style: 'font-weight',
            getAttrs: (value) => {
                return /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null;
            }
        }
    ],
    toDOM() {
        return ['strong', 0];
    }
};
// :: MarkSpec Code font mark. Represented as a `<code>` element.
const code = {
    parseDOM: [
        { tag: 'code' }
    ],
    toDOM() {
        return ['code', 0];
    }
};
// :: MarkSpec An underline mark. Rendered as an `<u>` element.
// Has parse rules that also match `text-decoration: underline`.
const u = {
    parseDOM: [
        { tag: 'u' },
        { style: 'text-decoration=underline' }
    ],
    toDOM() {
        return ['u', 0];
    }
};
// :: MarkSpec An underline mark. Rendered as an `<s>` element.
// Has parse rules that also match `strike`, `del` tag and css property `text-decoration: line-through`.
const s = {
    parseDOM: [
        { tag: 's' },
        { tag: 'strike' },
        { style: 'text-decoration=line-through' }
    ],
    toDOM() {
        return ['s', 0];
    }
};
const textColor = {
    attrs: {
        color: {
            default: null
        },
    },
    parseDOM: [
        {
            style: 'color',
            getAttrs: (value) => {
                return { color: value };
            }
        }
    ],
    toDOM(mark) {
        const { color } = mark.attrs;
        return ['span', { style: `color:${color};` }, 0];
    },
};
const textBackgroundColor = {
    attrs: {
        backgroundColor: {
            default: null
        },
    },
    parseDOM: [
        {
            style: 'background-color',
            getAttrs: (value) => {
                return { backgroundColor: value };
            }
        }
    ],
    toDOM(mark) {
        const { backgroundColor } = mark.attrs;
        return ['span', { style: `background-color:${backgroundColor};` }, 0];
    },
};
const marks = {
    link,
    em,
    strong,
    code,
    u,
    s,
    text_color: textColor,
    text_background_color: textBackgroundColor
};

const doc = {
    content: 'block+'
};
// :: NodeSpec The text node.
const text = {
    group: 'inline'
};
// :: NodeSpec A plain paragraph textblock. Represented in the DOM
// as a `<p>` element.
const paragraph = {
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
            getAttrs(dom) {
                const { textAlign } = dom.style;
                const align = dom.getAttribute('align') || textAlign || null;
                return {
                    align
                };
            }
        }
    ],
    toDOM(node) {
        const { align } = node.attrs;
        const styles = {
            textAlign: align !== 'left' ? align : null
        };
        const style = toStyleString(styles) || null;
        return ['p', { style }, 0];
    }
};
// :: NodeSpec A blockquote (`<blockquote>`) wrapping one or more blocks.
const blockquote = {
    content: 'block+',
    group: 'block',
    defining: true,
    parseDOM: [{ tag: 'blockquote' }],
    toDOM() {
        return ['blockquote', 0];
    }
};
// :: NodeSpec A horizontal rule (`<hr>`).
const horizontalRule = {
    group: 'block',
    parseDOM: [{ tag: 'hr' }],
    toDOM() {
        return ['hr'];
    }
};
// :: NodeSpec A heading textblock, with a `level` attribute that
// should hold the number 1 to 6. Parsed and serialized as `<h1>` to
// `<h6>` elements.
const heading = {
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
            getAttrs(dom) {
                const { textAlign } = dom.style;
                const align = dom.getAttribute('align') || textAlign || null;
                return {
                    level: 1,
                    align
                };
            }
        },
        {
            tag: 'h2',
            getAttrs(dom) {
                const { textAlign } = dom.style;
                const align = dom.getAttribute('align') || textAlign || null;
                return {
                    level: 2,
                    align
                };
            }
        },
        {
            tag: 'h3',
            getAttrs(dom) {
                const { textAlign } = dom.style;
                const align = dom.getAttribute('align') || textAlign || null;
                return {
                    level: 3,
                    align
                };
            }
        },
        {
            tag: 'h4',
            getAttrs(dom) {
                const { textAlign } = dom.style;
                const align = dom.getAttribute('align') || textAlign || null;
                return {
                    level: 4,
                    align
                };
            }
        },
        {
            tag: 'h5',
            getAttrs(dom) {
                const { textAlign } = dom.style;
                const align = dom.getAttribute('align') || textAlign || null;
                return {
                    level: 5,
                    align
                };
            }
        },
        {
            tag: 'h6',
            getAttrs(dom) {
                const { textAlign } = dom.style;
                const align = dom.getAttribute('align') || textAlign || null;
                return {
                    level: 6,
                    align
                };
            }
        },
    ],
    toDOM(node) {
        const { level, align } = node.attrs;
        const styles = {
            textAlign: align !== 'left' ? align : null
        };
        const style = toStyleString(styles) || null;
        return ['h' + level, { style }, 0];
    }
};
// :: NodeSpec A code listing. Disallows marks or non-text inline
// nodes by default. Represented as a `<pre>` element with a
// `<code>` element inside of it.
const codeBlock = {
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
    toDOM() {
        return ['pre', ['code', 0]];
    }
};
// :: NodeSpec A hard line break, represented in the DOM as `<br>`.
const hardBreak = {
    inline: true,
    group: 'inline',
    selectable: false,
    parseDOM: [{ tag: 'br' }],
    toDOM() {
        return ['br'];
    }
};
// :: NodeSpec An inline image (`<img>`) node. Supports `src`,
// `alt`, and `href` attributes. The latter two default to the empty
// string.
const image = {
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
            getAttrs(dom) {
                return {
                    src: dom.getAttribute('src'),
                    title: dom.getAttribute('title'),
                    alt: dom.getAttribute('alt'),
                    width: dom.getAttribute('width')
                };
            }
        }
    ],
    toDOM(node) {
        const { src, alt, title, width } = node.attrs;
        return ['img', { src, alt, title, width }];
    }
};
const listItem = Object.assign(Object.assign({}, listItem$1), { content: 'paragraph block*' });
const orderedList = Object.assign(Object.assign({}, orderedList$1), { content: 'list_item+', group: 'block' });
const bulletList = Object.assign(Object.assign({}, bulletList$1), { content: 'list_item+', group: 'block' });
const nodes = {
    doc,
    text,
    paragraph,
    blockquote,
    horizontal_rule: horizontalRule,
    heading,
    hard_break: hardBreak,
    code_block: codeBlock,
    image,
    list_item: listItem,
    ordered_list: orderedList,
    bullet_list: bulletList
};

const schema = new Schema({
    marks,
    nodes
});

/**
 * Generated bundle index. Do not edit.
 */

export { marks, nodes, schema };
//# sourceMappingURL=ngx-editor-schema.js.map
