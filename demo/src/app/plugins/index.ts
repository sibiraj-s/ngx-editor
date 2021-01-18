import { Plugin } from 'prosemirror-state';
import { image } from 'ngx-editor/plugins';

const getPlugins = (): Plugin[] => {
  const plugins = [
    image({
      resize: true,
    })
  ];

  return plugins;
};

export default getPlugins();
