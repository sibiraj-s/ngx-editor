export interface MenuItemMeta {
  key: string;
  i18nKey: string;
  icon?: string;
  toggleIcon?: string;
  type: 'mark' | 'node';
  attrs?: {
    level?: number,
    align?: string | null
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
      align: null
    },
    type: 'node'
  },
  h2: {
    key: 'heading',
    i18nKey: 'heading',
    attrs: {
      level: 2,
      align: null
    },
    type: 'node'
  },
  h3: {
    key: 'heading',
    i18nKey: 'heading',
    attrs: {
      level: 3,
      align: null
    },
    type: 'node'
  },
  h4: {
    key: 'heading',
    i18nKey: 'heading',
    attrs: {
      level: 4,
      align: null
    },
    type: 'node'
  },
  h5: {
    key: 'heading',
    i18nKey: 'heading',
    attrs: {
      level: 5,
      align: null
    },
    type: 'node'
  },
  h6: {
    key: 'heading',
    i18nKey: 'heading',
    attrs: {
      level: 6,
      align: null
    },
    type: 'node'
  },
  blockquote: {
    key: 'blockquote',
    i18nKey: 'blockquote',
    icon: 'quote',
    type: 'node'
  },
  link: {
    key: 'link',
    i18nKey: 'link',
    icon: 'link',
    type: 'mark',
    toggleIcon: 'unlink'
  },
  image: {
    key: 'image',
    i18nKey: 'image',
    icon: 'image',
    type: 'node'
  },
  align_left: {
    key: 'align',
    attrs: {
      align: 'left'
    },
    i18nKey: 'align_left',
    icon: 'align_left',
    type: 'node'
  },
  align_right: {
    key: 'align',
    attrs: {
      align: 'right'
    },
    i18nKey: 'align_right',
    icon: 'align_right',
    type: 'node'
  },
  align_center: {
    key: 'align',
    attrs: {
      align: 'center'
    },
    i18nKey: 'align_center',
    icon: 'align_center',
    type: 'node'
  }
};

export default menuItemsMeta;
