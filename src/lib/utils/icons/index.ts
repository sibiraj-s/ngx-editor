// Icons source: https://material.io/

import bold from './bold';
import italic from './italic';
import code from './code';
import orderedList from './ordered_list';
import bulletList from './bullet_list';

const height = 20;
const width = 20;

const icons = {
  bold,
  italic,
  code,
  ordered_list: orderedList,
  bullet_list: bulletList
};

// Helper function to create menu icons
export function getIconSvg(name: string) {
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
