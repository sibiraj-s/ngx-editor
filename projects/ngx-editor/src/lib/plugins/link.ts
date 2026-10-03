import { Fragment, Slice, Node as ProseMirrorNode } from 'prosemirror-model';
import { Plugin, PluginKey } from 'prosemirror-state';

// urls with a protocol and a host, or domains ending with an alphabetic tld (so numbers like 3.14 are skipped)
// trailing punctuation like the period ending a sentence is left out of the link
const HTTP_LINK_REGEX = /(?<=^|[\s(])(?:https?:\/\/[\w-]+(?:\.[\w-]+)*(?::\d+)?|(?:[\w-]+\.)+[a-z]{2,}(?::\d+)?)(?:[/?#]\S*?)?(?=[.,;:!?)]*$)/i;

const linkify = (fragment: Fragment): Fragment => {
  const linkified: ProseMirrorNode[] = [];

  fragment.forEach((child: ProseMirrorNode) => {
    if (child.isText) {
      const text = child.text as string;
      let pos = 0;

      const match: RegExpMatchArray | null = HTTP_LINK_REGEX.exec(text);

      if (match) {
        const start = match.index;
        const end = start + match[0].length;
        const { link } = child.type.schema.marks;

        if (start > 0) {
          linkified.push(child.cut(pos, start));
        }

        const urlText = text.slice(start, end);
        linkified.push(
          child.cut(start, end).mark(link.create({ href: urlText }).addToSet(child.marks)),
        );
        pos = end;
      }

      if (pos < text.length) {
        linkified.push(child.cut(pos));
      }
    } else {
      linkified.push(child.copy(linkify(child.content)));
    }
  });

  return Fragment.fromArray(linkified);
};

const linkifyPlugin = ():Plugin => {
  return new Plugin({
    key: new PluginKey('linkify'),
    props: {
      transformPasted: (slice: Slice, view) => {
        // custom schemas may not have the link mark
        if (!view.state.schema.marks['link']) {
          return slice;
        }

        return new Slice(linkify(slice.content), slice.openStart, slice.openEnd);
      },
    },
  });
};

export default linkifyPlugin;
