export default {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: {
        level: 3
      },
      content: [
        {
          type: 'text',
          text: 'Hello'
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'This is editable text. You can focus it and start typing.'
        }
      ]
    },
    {
      type: 'heading',
      attrs: {
        level: 3
      },
      content: [
        {
          type: 'text',
          text: 'The code block is a code editor'
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'This editor has been wired up to render code blocks as instances of the '
        },
        {
          type: 'text',
          marks: [
            {
              type: 'link',
              attrs: {
                href: 'https://codemirror.net',
                title: null
              }
            }
          ],
          text: 'CodeMirror'
        },
        {
          type: 'text',
          text: ' code editor, which provides '
        },
        {
          type: 'text',
          marks: [
            {
              type: 'link',
              attrs: {
                href: 'https://en.wikipedia.org',
                title: ''
              }
            }
          ],
          text: 'syntax highlighting'
        },
        {
          type: 'text',
          text: ', auto-indentation, and similar.'
        }
      ]
    },
    {
      type: 'code_block',
      content: [
        {
          type: 'text',
          text: 'function max(a, b) {\n  return a > b ? a : b\n}'
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'The content of the code editor is kept in sync with the content of the code block in the rich text editor, so that it is as if you\'re directly editing the outer document, using a more convenient interface.'
        }
      ]
    }
  ]
};
