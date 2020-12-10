import { DOMOutputSpec, MarkSpec } from 'prosemirror-model';

type GetAttrsSpec = { [key: string]: any } | null;

// :: MarkSpec A link. Has `href` and `title` attributes. `title`
// defaults to the empty string. Rendered and parsed as an `<a>`
// element.
const link: MarkSpec = {
  attrs: {
    href: {},
    title: { default: null },
    target: { default: '_blank' }
  },
  inclusive: false,
  parseDOM: [
    {
      tag: 'a[href]',
      getAttrs(dom: HTMLElement): GetAttrsSpec {
        return {
          href: dom.getAttribute('href'),
          title: dom.getAttribute('title'),
          target: dom.getAttribute('target'),
        };
      }
    }],
  toDOM(node): DOMOutputSpec {
    const { href, title, target } = node.attrs;
    return ['a', { href, title, target }, 0];
  }
};

// :: MarkSpec An emphasis mark. Rendered as an `<em>` element.
// Has parse rules that also match `<i>` and `font-style: italic`.
const em: MarkSpec = {
  parseDOM: [
    { tag: 'i' },
    { tag: 'em' },
    { style: 'font-style=italic' }
  ],
  toDOM(): DOMOutputSpec {
    return ['em', 0];
  }
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
      getAttrs: (dom: HTMLElement): GetAttrsSpec => {
        return dom.style.fontWeight !== 'normal' && null;
      },
    },
    {
      style: 'font-weight',
      getAttrs: (value: string): GetAttrsSpec => {
        return /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null;
      }
    }
  ],
  toDOM(): DOMOutputSpec {
    return ['strong', 0];
  }
};

// :: MarkSpec Code font mark. Represented as a `<code>` element.
const code: MarkSpec = {
  parseDOM: [
    { tag: 'code' }
  ],
  toDOM(): DOMOutputSpec {
    return ['code', 0];
  }
};

const makrs = {
  link,
  em,
  strong,
  code
};

export default makrs;
