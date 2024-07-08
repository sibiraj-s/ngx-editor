import { DOMOutputSpec, Node as ProseMirrorNode, NodeSpec } from 'prosemirror-model';
import * as sl from 'prosemirror-schema-list';

import { toStyleString } from 'ngx-editor/utils';

const doc: NodeSpec = {
  content: 'block+',
};

// :: NodeSpec The text node.
const text: NodeSpec = {
  group: 'inline',
};

// :: NodeSpec A plain paragraph textblock. Represented in the DOM
// as a `<p>` element.
const paragraph: NodeSpec = {
  content: 'inline*',
  group: 'block',
  attrs: {
    align: {
      default: null,
    },
    indent: {
      default: null,
    },
  },
  parseDOM: [
    {
      tag: 'p',
      getAttrs(dom: HTMLElement) {
        const { textAlign } = dom.style;
        const align = dom.getAttribute('align') || textAlign || null;
        const indent = dom.getAttribute('data-indent') || null;

        return {
          align,
          indent: parseInt(indent, 10) || null,
        };
      },
    },
  ],
  toDOM(node): DOMOutputSpec {
    const { align, indent } = node.attrs;

    const styles: Partial<CSSStyleDeclaration> = {
      textAlign: align !== 'left' ? align : null,
      marginLeft: indent !== null ? `${indent * 40}px` : null,
    };
    const style = toStyleString(styles) || null;

    const attrs = {
      style,
      'data-indent': indent ?? null,
    };

    return ['p', attrs, 0];
  },
};

// :: NodeSpec A blockquote (`<blockquote>`) wrapping one or more blocks.
const blockquote: NodeSpec = {
  content: 'block+',
  group: 'block',
  defining: true,
  attrs: {
    indent: {
      default: null,
    },
  },
  parseDOM: [
    {
      tag: 'blockquote',
      getAttrs(dom: HTMLElement) {
        const indent = dom.getAttribute('data-indent') || null;
        return {
          indent: parseInt(indent, 10) || null,
        };
      },
    },
  ],
  toDOM(node): DOMOutputSpec {
    const { indent } = node.attrs;

    const styles: Partial<CSSStyleDeclaration> = {
      marginLeft: indent !== null ? `${indent * 40}px` : null,
    };

    const style = toStyleString(styles) || null;

    const attrs = {
      style,
      'data-indent': indent ?? null,
    };

    return ['blockquote', attrs, 0];
  },
};

// :: NodeSpec A horizontal rule (`<hr>`).
const horizontalRule: NodeSpec = {
  group: 'block',
  parseDOM: [{ tag: 'hr' }],
  toDOM(): DOMOutputSpec {
    return ['hr'];
  },
};

// :: NodeSpec A heading textblock, with a `level` attribute that
// should hold the number 1 to 6. Parsed and serialized as `<h1>` to
// `<h6>` elements.
const heading: NodeSpec = {
  attrs: {
    level: {
      default: 1,
    },
    align: {
      default: null,
    },
    indent: {
      default: null,
    },
  },
  content: 'inline*',
  group: 'block',
  defining: true,
  parseDOM: [
    {
      tag: 'h1',
      getAttrs(dom: HTMLElement): Record<string, any> {
        const { textAlign } = dom.style;
        const align = dom.getAttribute('align') || textAlign || null;
        const indent = dom.getAttribute('data-indent') || null;

        return {
          level: 1,
          align,
          indent: parseInt(indent, 10) || null,
        };
      },
    },
    {
      tag: 'h2',
      getAttrs(dom: HTMLElement): Record<string, any> {
        const { textAlign } = dom.style;
        const align = dom.getAttribute('align') || textAlign || null;
        const indent = dom.getAttribute('data-indent') || null;

        return {
          level: 2,
          align,
          indent: parseInt(indent, 10) || null,
        };
      },
    },
    {
      tag: 'h3',
      getAttrs(dom: HTMLElement): Record<string, any> {
        const { textAlign } = dom.style;
        const align = dom.getAttribute('align') || textAlign || null;
        const indent = dom.getAttribute('data-indent') || null;

        return {
          level: 3,
          align,
          indent: parseInt(indent, 10) || null,
        };
      },
    },
    {
      tag: 'h4',
      getAttrs(dom: HTMLElement): Record<string, any> {
        const { textAlign } = dom.style;
        const align = dom.getAttribute('align') || textAlign || null;
        const indent = dom.getAttribute('data-indent') || null;

        return {
          level: 4,
          align,
          indent: parseInt(indent, 10) || null,
        };
      },
    },
    {
      tag: 'h5',
      getAttrs(dom: HTMLElement): Record<string, any> {
        const { textAlign } = dom.style;
        const align = dom.getAttribute('align') || textAlign || null;
        const indent = dom.getAttribute('data-indent') || null;

        return {
          level: 5,
          align,
          indent: parseInt(indent, 10) || null,
        };
      },
    },
    {
      tag: 'h6',
      getAttrs(dom: HTMLElement): Record<string, any> {
        const { textAlign } = dom.style;
        const align = dom.getAttribute('align') || textAlign || null;
        const indent = dom.getAttribute('data-indent') || null;

        return {
          level: 6,
          align,
          indent: parseInt(indent, 10) || null,
        };
      },
    },
  ],
  toDOM(node): DOMOutputSpec {
    const { level, align, indent } = node.attrs;

    const styles: Partial<CSSStyleDeclaration> = {
      textAlign: align !== 'left' ? align : null,
      marginLeft: indent !== null ? `${indent * 40}px` : null,
    };
    const style = toStyleString(styles) || null;

    const attrs = {
      style,
      'data-indent': indent ?? null,
    };

    return [`h${level}`, attrs, 0];
  },
};

// :: NodeSpec A code listing. Disallows marks or non-text inline
// nodes by default. Represented as a `<pre>` element with a
// `<code>` element inside of it.
const codeBlock: NodeSpec = {
  content: 'text*',
  marks: '',
  group: 'block',
  code: true,
  defining: true,
  parseDOM: [
    {
      tag: 'pre',
      preserveWhitespace: 'full',
    },
  ],
  toDOM(): DOMOutputSpec {
    return ['pre', ['code', 0]];
  },
};

// :: NodeSpec A hard line break, represented in the DOM as `<br>`.
const hardBreak: NodeSpec = {
  inline: true,
  group: 'inline',
  selectable: false,
  parseDOM: [{ tag: 'br' }],
  toDOM(): DOMOutputSpec {
    return ['br'];
  },
};

// :: NodeSpec An inline image (`<img>`) node. Supports `src`,
// `alt`, and `href` attributes. The latter two default to the empty
// string.
export const image: NodeSpec = {
  inline: true,
  attrs: {
    src: {},
    alt: { default: null },
    title: { default: null },
    width: { default: null },
  },
  group: 'inline',
  draggable: true,
  parseDOM: [
    {
      tag: 'img[src]',
      getAttrs(dom: HTMLElement): Record<string, any> {
        return {
          src: dom.getAttribute('src'),
          title: dom.getAttribute('title'),
          alt: dom.getAttribute('alt'),
          width: dom.getAttribute('width'),
        };
      },
    },
  ],
  toDOM(node: ProseMirrorNode): DOMOutputSpec {
    const { src, alt, title, width } = node.attrs;
    return ['img', { src, alt, title, width }];
  },
};

const listItem = {
  ...sl.listItem,
  content: 'paragraph block*',
};

const orderedList = {
  ...sl.orderedList,
  content: 'list_item+',
  group: 'block',
};

const bulletList = {
  ...sl.bulletList,
  content: 'list_item+',
  group: 'block',
};

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
  bullet_list: bulletList,
};

export default nodes;
