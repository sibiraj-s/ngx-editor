# Mentions & tags

This sample demonstrate how to implement [prosemirror-mentions](https://www.npmjs.com/package/prosemirror-mentions) in Ngx-Editor.

## Install dependencies

```ts
npm i prosemirror-mentions prosemirror-schema-basic
```

## Make some code

- Create file mention.ts with content :

```ts
import { NodeSpec } from 'prosemirror-model';

/**
 * IMPORTANT: outer div's "suggestion-item-list" class is mandatory. The plugin uses this class for querying.
 * IMPORTANT: inner div's "suggestion-item" class is mandatory too for the same reasons
 */
export const getMentionSuggestionsHTML = (items) =>
  '<div class="suggestion-item-list">' +
  items
    .map((i) => '<div class="suggestion-item">' + i.name + '</div>')
    .join('') +
  '</div>';

/**
 * See https://prosemirror.net/docs/ref/#model.NodeSpec
 */
export const mentionNode: NodeSpec = {
  group: 'inline',
  inline: true,
  atom: true,

  attrs: {
    id: {},
    name: {},
    email: {},
  },

  selectable: false,
  draggable: false,

  toDOM: (node) => {
    return [
      'span',
      {
        'data-mention-id': node.attrs.id,
        'data-mention-name': node.attrs.name,
        'data-mention-email': node.attrs.email,
        class: 'prosemirror-mention-node',
      },
      '@' + node.attrs.name || node.attrs.email,
    ];
  },

  parseDOM: [
    {
      // match tag with following CSS Selector
      tag: 'span[data-mention-id][data-mention-name][data-mention-email]',

      getAttrs: (dom: HTMLElement) => {
        var id = dom.getAttribute('data-mention-id');
        var name = dom.getAttribute('data-mention-name');
        var email = dom.getAttribute('data-mention-email');
        return {
          id: id,
          name: name,
          email: email,
        };
      },
    },
  ],
};
```

- Create file tag.ts with content :

```ts
import { NodeSpec } from 'prosemirror-model';

/**
 * IMPORTANT: outer div's "suggestion-item-list" class is mandatory. The plugin uses this class for querying.
 * IMPORTANT: inner div's "suggestion-item" class is mandatory too for the same reasons
 */
export const getMentionSuggestionsHTML = (items) =>
  '<div class="suggestion-item-list">' +
  items
    .map((i) => '<div class="suggestion-item">' + i.name + '</div>')
    .join('') +
  '</div>';

/**
 * See https://prosemirror.net/docs/ref/#model.NodeSpec
 */
export const mentionNode: NodeSpec = {
  group: 'inline',
  inline: true,
  atom: true,

  attrs: {
    id: {},
    name: {},
    email: {},
  },

  selectable: false,
  draggable: false,

  toDOM: (node) => {
    return [
      'span',
      {
        'data-mention-id': node.attrs.id,
        'data-mention-name': node.attrs.name,
        'data-mention-email': node.attrs.email,
        class: 'prosemirror-mention-node',
      },
      '@' + node.attrs.name || node.attrs.email,
    ];
  },

  parseDOM: [
    {
      // match tag with following CSS Selector
      tag: 'span[data-mention-id][data-mention-name][data-mention-email]',

      getAttrs: (dom: HTMLElement) => {
        var id = dom.getAttribute('data-mention-id');
        var name = dom.getAttribute('data-mention-name');
        var email = dom.getAttribute('data-mention-email');
        return {
          id: id,
          name: name,
          email: email,
        };
      },
    },
  ],
};
```

- Update schema.ts with :

```ts
import {
  mentionNode
} from './mention';
import {
  tagNode
} from './tag';

...

const nodes = {
  ...basicNodes,
  mention: mentionNode,
  tag: tagNode,
  code_mirror: codeMirror,

};

...
```

- Update getPlugins in /plugins/index.ts :

```ts
import {
  getMentionSuggestionsHTML
} from '../mention';
import {
  getTagSuggestionsHTML
} from '../tag';
import {
  getMentionsPlugin
} from 'prosemirror-mentions'

...

const getPlugins = (): Plugin[] => {

  const users = [{
    name: 'John Doe',
    id: '101',
    email: 'joe@gmail.com'
  }, {
    name: 'Joe Lewis',
    id: '102',
    email: 'lewis@gmail.com'
    }];

const plugins = [

    ...

        getMentionsPlugin({
        getSuggestions: (type, text, done) => {
            setTimeout(() => {
            if (type === 'mention') {
                // autocomplete : filter list from text and return 5 users
                done(users.filter(x => x.name.toLowerCase().includes(text.toLowerCase())).splice(0, 5))
            } else {
                // pass dummy tag suggestions
                done([{
                tag: 'WikiLeaks'
                }, {
                tag: 'NetNeutrality'
                }])
            }
            }, 0);
        },
        getSuggestionsHTML: (items, type) => {
            if (type === 'mention') {
            return getMentionSuggestionsHTML(items)
            } else if (type === 'tag') {
            return getTagSuggestionsHTML(items)
            }
            else {
            return null;
            }
        }
        })

    ...
    ];
}
```

- Update app.component.ts :

Change  
`editorContent: new FormControl(jsonDoc, Validators.required())`  
to  
`editorContent: new FormControl(jsonDoc, Validators.required(schema))`

---

**NOTE**

Be sure to add content:jsonDoc to Editor instantiation in app.component.ts ngOnInit

```ts
this.editor = new Editor({
  schema,
  plugins,
  nodeViews,
  content: jsonDoc, // this line is important otherwise an error is thrown
  history: true,
  keyboardShortcuts: true,
  inputRules: true,
});
```

---

## Make some style

- Add to styles.scss :

```css
.prosemirror-mention-node {
  color: blue !important;
  text-decoration: underline !important;
}
.prosemirror-tag-node {
  color: gray !important;
  font-style: italic;
}
```

- Add to app.component.scss

```css
.suggestion-item-list {
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.suggestion-item {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.suggestion-item:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}
```
