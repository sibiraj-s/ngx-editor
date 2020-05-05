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
  },
  h1: {
    key: 'heading',
    attrs: {
      level: 1,
    },
    type: 'node'
  },
  h2: {
    key: 'heading',
    attrs: {
      level: 2,
    },
    type: 'node'
  },
  h3: {
    key: 'heading',
    attrs: {
      level: 3,
    },
    type: 'node'
  },
  h4: {
    key: 'heading',
    attrs: {
      level: 4,
    },
    type: 'node'
  },
  h5: {
    key: 'heading',
    attrs: {
      level: 5,
    },
    type: 'node'
  },
  h6: {
    key: 'heading',
    attrs: {
      level: 6,
    },
    type: 'node'
  }
};

export default menuItemsMeta;
