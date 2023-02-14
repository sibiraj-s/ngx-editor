/* eslint-disable @typescript-eslint/naming-convention */
// Icons source: https://material.io/

import Icons from '../Icons';

const ICON_LIST = new Icons();

const bold = ICON_LIST.get('bold');
const italic = ICON_LIST.get('italic');
const code = ICON_LIST.get('code');
const underline = ICON_LIST.get('underline');
const strike = ICON_LIST.get('strike');
const ordered_list = ICON_LIST.get('ordered_list');
const bullet_list = ICON_LIST.get('bullet_list');
const quote = ICON_LIST.get('quote');
const link = ICON_LIST.get('link');
const unlink = ICON_LIST.get('unlink');
const image = ICON_LIST.get('image');
const align_left = ICON_LIST.get('align_left');
const align_center = ICON_LIST.get('align_center');
const align_right = ICON_LIST.get('align_right');
const align_justify = ICON_LIST.get('align_justify');
const text_color = ICON_LIST.get('text_color');
const color_fill = ICON_LIST.get('color_fill');
const horizontal_rule = ICON_LIST.get('horizontal_rule');
const format_clear = ICON_LIST.get('format_clear');
const path = ICON_LIST.get('path');

const DEFAULT_ICON_HEIGHT = 20;
const DEFAULT_ICON_WIDTH = 20;
const DEFAULT_ICON_FILL = 'currentColor';

const icons: Record<string, any> = {
  bold,
  italic,
  code,
  underline,
  strike,
  ordered_list,
  bullet_list,
  blockquote: quote,
  link,
  unlink,
  image,
  align_left,
  align_center,
  align_right,
  align_justify,
  text_color,
  color_fill,
  horizontal_rule,
  format_clear,
  path,
};

class Icon {
  static get(name: keyof typeof icons, fill = DEFAULT_ICON_FILL): string {
    const fullPath = icons[name];
    if (fullPath.includes('<path') || fullPath.includes('<g')) {
      return `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill=${fill}
          height=${DEFAULT_ICON_HEIGHT}
          width=${DEFAULT_ICON_WIDTH}
        >
          ${fullPath}
        </svg>
      `;
    }
    return fullPath;
  }
}

export default Icon;
