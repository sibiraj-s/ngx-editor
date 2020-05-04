import { MenuItemMeta } from '../../types';

const menuItemsMeta: { [key: string]: MenuItemMeta } = {
  bold: {
    key: 'strong',
    icon: 'bold',
    type: 'mark',
  },
  italic: {
    key: 'em',
    icon: 'italic',
    type: 'mark',
  },
  code: {
    key: 'code',
    icon: 'code',
    type: 'mark',
  },
  ordered_list: {
    key: 'ordered_list',
    icon: 'ordered_list',
    type: 'node',
  },
  bullet_list: {
    key: 'bullet_list',
    icon: 'bullet_list',
    type: 'node',
  }
};

export default menuItemsMeta;
