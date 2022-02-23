import { Plugin, PluginKey } from 'prosemirror-state';

const focusPlugin = (cb: () => void): Plugin => {
  return new Plugin({
    key: new PluginKey('focus'),
    props: {
      handleDOMEvents: {
        focus: () => {
          cb();
          return false;
        },
      },
    },
  });
};

export default focusPlugin;
