// Icons source: https://material.io/

import bold from './bold';
import italic from './italic';
import code from './code';
import orderedList from './ordered_list';
import bulletList from './bullet_list';
import quote from './quote';
import link from './link';
import unlink from './unlink';
import image from './image';
import alignLeft from './align_left';
import alignCenter from './align_center';
import alignRight from './align_right';

const DEFAULT_ICON_HEIGHT = 20;
const DEFAULT_ICON_WIDTH = 20;

const icons = {
  bold,
  italic,
  code,
  ordered_list: orderedList,
  bullet_list: bulletList,
  quote,
  link,
  unlink,
  image,
  align_left: alignLeft,
  align_center: alignCenter,
  align_right: alignRight
};

// Helper function to create menu icons
export function getIconSvg(name: string, width = DEFAULT_ICON_WIDTH, height = DEFAULT_ICON_HEIGHT): string {
  const path = icons[name] || '<path></path>';

  return `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="black"
    height=${height}
    width=${width}
  >
    ${path}
  </svg>
  `;
}
