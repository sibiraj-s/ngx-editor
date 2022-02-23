import { Plugin, PluginKey } from 'prosemirror-state';

const attributesPlugin = (attributes = {}): Plugin => {
  return new Plugin({
    key: new PluginKey('attributes'),
    props: {
      attributes,
    },
  });
};

export default attributesPlugin;
