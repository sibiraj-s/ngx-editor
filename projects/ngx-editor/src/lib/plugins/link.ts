import { Fragment, Slice, Node as ProseMirrorNode } from 'prosemirror-model';
import { Plugin, PluginKey } from 'prosemirror-state';

const HTTP_LINK_REGEX = /(?:https?:\/\/)?[\w-]+(?:\.[\w-]+)+\.?(?:\d+)?(?:\/\S*)?$/;

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
      transformPasted: (slice: Slice) => {
        return new Slice(linkify(slice.content), slice.openStart, slice.openEnd);
      },
    },
  });
};

export default linkifyPlugin;
