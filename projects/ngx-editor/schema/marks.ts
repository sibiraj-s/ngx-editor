import { DOMOutputSpec, Mark, MarkSpec } from 'prosemirror-model';

// :: MarkSpec A link. Has `href` and `title` attributes. `title`
// defaults to the empty string. Rendered and parsed as an `<a>`
// element.
const link: MarkSpec = {
  attrs: {
    href: {},
    title: { default: null },
    target: { default: '_blank' },
  },
  inclusive: false,
  parseDOM: [
    {
      tag: 'a[href]',
      getAttrs(dom: HTMLElement): Record<string, any> {
        return {
          href: dom.getAttribute('href'),
          title: dom.getAttribute('title'),
          target: dom.getAttribute('target'),
        };
      },
    },
  ],
  toDOM(node): DOMOutputSpec {
    const { href, title, target } = node.attrs;
    return ['a', { href, title, target }, 0];
  },
};

// :: MarkSpec An emphasis mark. Rendered as an `<em>` element.
// Has parse rules that also match `<i>` and `font-style: italic`.
const em: MarkSpec = {
  parseDOM: [
    { tag: 'i' },
    { tag: 'em' },
    { style: 'font-style=italic' },
  ],
  toDOM(): DOMOutputSpec {
    return ['em', 0];
  },
};

// :: MarkSpec A strong mark. Rendered as `<strong>`, parse rules
// also match `<b>` and `font-weight: bold`.
const strong: MarkSpec = {
  parseDOM: [
    { tag: 'strong' },
    // This works around a Google Docs misbehavior where
    // pasted content will be inexplicably wrapped in `<b>`
    // tags with a font-weight normal.
    {
      tag: 'b',
      getAttrs: (dom: HTMLElement): Record<string, any> => {
        return dom.style.fontWeight !== 'normal' && null;
      },
    },
    {
      style: 'font-weight',
      getAttrs: (value: string): Record<string, any> => {
        return (/^(?:bold(?:er)?|[5-9]\d{2,})$/).test(value) && null;
      },
    },
  ],
  toDOM(): DOMOutputSpec {
    return ['strong', 0];
  },
};

// :: MarkSpec Code font mark. Represented as a `<code>` element.
const code: MarkSpec = {
  parseDOM: [
    { tag: 'code' },
  ],
  toDOM(): DOMOutputSpec {
    return ['code', 0];
  },
};

// :: MarkSpec An underline mark. Rendered as an `<u>` element.
// Has parse rules that also match `text-decoration: underline`.
const u: MarkSpec = {
  parseDOM: [
    { tag: 'u' },
    {
      style: 'text-decoration=underline',
      consuming: false,
    },
  ],
  toDOM(): DOMOutputSpec {
    return ['u', 0];
  },
};

// :: MarkSpec An underline mark. Rendered as an `<s>` element.
// Has parse rules that also match `strike`, `del` tag and css property `text-decoration: line-through`.
const s: MarkSpec = {
  parseDOM: [
    { tag: 's' },
    { tag: 'strike' },
    { style: 'text-decoration=line-through' },
  ],
  toDOM(): DOMOutputSpec {
    return ['s', 0];
  },
};

const textColor: MarkSpec = {
  attrs: {
    color: {
      default: null,
    },
  },
  parseDOM: [
    {
      style: 'color',
      getAttrs: (value: string): Record<string, any> => {
        return { color: value };
      },
    },
  ],
  toDOM(mark: Mark): DOMOutputSpec {
    const { color } = mark.attrs;
    return ['span', { style: `color:${color};` }, 0];
  },
};

const textBackgroundColor: MarkSpec = {
  attrs: {
    backgroundColor: {
      default: null,
    },
  },
  parseDOM: [
    {
      style: 'background-color',
      getAttrs: (value: string): Record<string, any> => {
        return { backgroundColor: value };
      },
    },
  ],
  toDOM(mark: Mark): DOMOutputSpec {
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
  text_background_color: textBackgroundColor,
};

export default marks;
