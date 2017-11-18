export class CommandExecutor {
  constructor(private document) {}

  public execute(command: string): void {
    if (command === 'removeBlockquote') {
      this.document.execCommand('formatBlock', false, 'div');
    } else if (command === 'blockquote') {
      this.document.execCommand('formatBlock', false, '<blockquote>');
    } else if (command === 'link') {
      this.createLink();
    } else if (command === 'image') {
      this.insertImage();
    } else {
      this.document.execCommand(command, false, null);
    }
  }

  // insert image
  insertImage() {
    const imageURI = prompt('Enter Image URL', 'http://');
    if (imageURI) {
      const inserted = this.document.execCommand('insertImage', false, imageURI);
      if (!inserted) {
        //this.createMessage('Invalid URL');
      }
    }
  }

  // insert link
  createLink() {
    const selection = document.getSelection();

    if (selection.anchorNode.parentElement.tagName === 'A') {
      const linkURL = prompt('Enter URL', selection.anchorNode.parentElement.getAttribute('href'));
      if (linkURL) {
        this.document.execCommand('createLink', false, linkURL);
      }
    } else {
      if (selection['type'] === 'None') {
        //this.createMessage('No selection made');
      } else {
        const linkURL = prompt('Enter URL', 'http://');
        if (linkURL) {
          document.execCommand('createLink', false, linkURL);
        }
      }
    }
  }
}
