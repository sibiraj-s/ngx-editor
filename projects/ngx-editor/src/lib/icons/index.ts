// Icons source: https://material.io/

import bold from './bold';
import italic from './italic';
import code from './code';
import underline from './underline';
import strike from './strike';
import orderedList from './ordered_list';
import bulletList from './bullet_list';
import quote from './quote';
import link from './link';
import unlink from './unlink';
import image from './image';
import alignLeft from './align_left';
import alignCenter from './align_center';
import alignRight from './align_right';
import alignJustify from './align_justify';
import textColor from './text_color';
import colorFill from './color_fill';

const DEFAULT_ICON_HEIGHT = 20;
const DEFAULT_ICON_WIDTH = 20;
const DEFAULT_ICON_FILL = 'currentColor';

const icons: Record<string, any> = {
  bold,
  italic,
  code,
  underline,
  strike,
  ordered_list: orderedList,
  bullet_list: bulletList,
  blockquote: quote,
  link,
  unlink,
  image,
  align_left: alignLeft,
  align_center: alignCenter,
  align_right: alignRight,
  align_justify: alignJustify,
  text_color: textColor,
  color_fill: colorFill,
};

class Icon {
  static get(name: keyof typeof icons, fill = DEFAULT_ICON_FILL): string {
    const path = icons[name] || '<path></path>';
    return `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill=${fill}
        height=${DEFAULT_ICON_HEIGHT}
        width=${DEFAULT_ICON_WIDTH}
      >
        ${path}
      </svg>
    `;
  }
}

export default Icon;
