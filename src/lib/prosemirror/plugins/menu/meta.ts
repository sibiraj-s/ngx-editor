export interface MenuItemMeta {
  key: string;
  i18nKey: string;
  icon?: string;
  type: 'mark' | 'node';
  attrs?: {
    level?: number
  };
}

const menuItemsMeta: { [key: string]: MenuItemMeta } = {
  bold: {
    key: 'strong',
    i18nKey: 'bold',
    icon: 'bold',
    type: 'mark',
  },
  italic: {
    key: 'em',
    i18nKey: 'italics',
    icon: 'italic',
    type: 'mark',
  },
  code: {
    key: 'code',
    i18nKey: 'code',
    icon: 'code',
    type: 'mark',
  },
  ordered_list: {
    key: 'ordered_list',
    i18nKey: 'ordered_list',
    icon: 'ordered_list',
    type: 'node',
  },
  bullet_list: {
    key: 'bullet_list',
    i18nKey: 'bullet_list',
    icon: 'bullet_list',
    type: 'node',
  },
  h1: {
    key: 'heading',
    i18nKey: 'heading',
    attrs: {
      level: 1,
    },
    type: 'node'
  },
  h2: {
    key: 'heading',
    i18nKey: 'heading',
    attrs: {
      level: 2,
    },
    type: 'node'
  },
  h3: {
    key: 'heading',
    i18nKey: 'heading',
    attrs: {
      level: 3,
    },
    type: 'node'
  },
  h4: {
    key: 'heading',
    i18nKey: 'heading',
    attrs: {
      level: 4,
    },
    type: 'node'
  },
  h5: {
    key: 'heading',
    i18nKey: 'heading',
    attrs: {
      level: 5,
    },
    type: 'node'
  },
  h6: {
    key: 'heading',
    i18nKey: 'heading',
    attrs: {
      level: 6,
    },
    type: 'node'
  }
};

export default menuItemsMeta;
