import { ComputedOptions, Config, Toolbar } from '../types';

interface Options {
  placeholder: string;
  config: Config;
}

const defaultToolbarOptions: Toolbar = [
  ['bold', 'italic', 'code'],
];

const defaultConfig: Config = {
  toolbar: true
};

const getToolbar = (config: Config): Toolbar => {
  let toolbar = null;

  // set toolbar options
  if (typeof config.toolbar === 'boolean') {
    if (config.toolbar) {
      toolbar = defaultToolbarOptions;
    }
  } else {
    toolbar = config.toolbar;
  }

  return toolbar;
};

// prefer attributes than config
const computeOptions = (options: Options): ComputedOptions => {
  const computedOptions = {} as ComputedOptions;

  const config = Object.assign({}, options.config, defaultConfig);

  computedOptions.toolbar = getToolbar(config);

  if (options.placeholder) {
    computedOptions.placeholder = options.placeholder;
  }

  return computedOptions;
};

export default computeOptions;
