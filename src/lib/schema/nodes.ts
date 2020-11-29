import { DOMOutputSpec, Node as ProsemirrorNode, NodeSpec } from 'prosemirror-model';
import * as sl from 'prosemirror-schema-list';

type GetAttrsSpec = { [key: string]: any };

const doc: NodeSpec = {
  content: 'block+'
};

// :: NodeSpec The text node.
const text: NodeSpec = {
  group: 'inline'
};

// :: NodeSpec A plain paragraph textblock. Represented in the DOM
// as a `<p>` element.
const paragraph: NodeSpec = {
  content: 'inline*',
  group: 'block',
  parseDOM: [{ tag: 'p' }],
  toDOM(): DOMOutputSpec {
    return ['p', 0];
  }
};

// :: NodeSpec A blockquote (`<blockquote>`) wrapping one or more blocks.
const blockquote: NodeSpec = {
  content: 'block+',
  group: 'block',
  defining: true,
  parseDOM: [{ tag: 'blockquote' }],
  toDOM(): DOMOutputSpec {
    return ['blockquote', 0];
  }
};

// :: NodeSpec A horizontal rule (`<hr>`).
const horizontalRule: NodeSpec = {
  group: 'block',
  parseDOM: [{ tag: 'hr' }],
  toDOM(): DOMOutputSpec {
    return ['hr'];
   }
};

// :: NodeSpec A heading textblock, with a `level` attribute that
// should hold the number 1 to 6. Parsed and serialized as `<h1>` to
// `<h6>` elements.
const heading: NodeSpec = {
  attrs: { level: { default: 1 } },
  content: 'inline*',
  group: 'block',
  defining: true,
  parseDOM: [{ tag: 'h1', attrs: { level: 1 } },
  { tag: 'h2', attrs: { level: 2 } },
  { tag: 'h3', attrs: { level: 3 } },
  { tag: 'h4', attrs: { level: 4 } },
  { tag: 'h5', attrs: { level: 5 } },
  { tag: 'h6', attrs: { level: 6 } }],
  toDOM(node): DOMOutputSpec {
    return ['h' + node.attrs.level, 0];
  }
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
  parseDOM: [{ tag: 'pre', preserveWhitespace: 'full' }],
  toDOM(): DOMOutputSpec {
    return ['pre', ['code', 0]];
  }
};

// :: NodeSpec A hard line break, represented in the DOM as `<br>`.
const hardBreak: NodeSpec = {
  inline: true,
  group: 'inline',
  selectable: false,
  parseDOM: [{ tag: 'br' }],
  toDOM(): DOMOutputSpec {
    return ['br'];
  }
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
    width: { default: null }
  },
  group: 'inline',
  draggable: true,
  parseDOM: [
    {
      tag: 'img[src]',
      getAttrs(dom: HTMLElement): GetAttrsSpec {
        return {
          src: dom.getAttribute('src'),
          title: dom.getAttribute('title'),
          alt: dom.getAttribute('alt')
        };
      }
    }
  ],
  toDOM(node: ProsemirrorNode): DOMOutputSpec {
    const { src, alt, title, width } = node.attrs;
    return ['img', { src, alt, title, width }];
  }
};

const listItem = {
  ...sl.listItem,
  content: 'paragraph block*'
 };

const orderedList = {
  ...sl.orderedList,
  content: 'list_item+',
  group: 'block'
};

const bulletList = {
  ...sl.bulletList,
  content: 'list_item+',
  group: 'block'
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
  bullet_list: bulletList
};

export default nodes;
