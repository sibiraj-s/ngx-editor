import { Plugin, PluginKey } from 'prosemirror-state';

const blurPlugin = (cb = () => { }) => {
  return new Plugin({
    key: new PluginKey('blur'),
    props: {
      handleDOMEvents: {
        blur: () => {
          cb();
          return false;
        }
      }
    }
  });
};

export default blurPlugin;
