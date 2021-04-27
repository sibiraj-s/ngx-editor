import { Plugin, PluginKey } from 'prosemirror-state';

const focusPlugin = (cb = () => { }) => {
  return new Plugin({
    key: new PluginKey('focus'),
    props: {
      handleDOMEvents: {
        focus: () => {
          cb();
          return false;
        }
      }
    }
  });
};

export default focusPlugin;
