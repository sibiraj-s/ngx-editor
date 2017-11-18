export class CommandExecutor {
  public execute(command: string): void {
    if (command === 'enableObjectResizing') {
      document.execCommand('enableObjectResizing', true, true);
      return;
    }

    if (command === 'removeBlockquote') {
      document.execCommand('formatBlock', false, 'div');
      return;
    }

    if (command === 'blockquote') {
      document.execCommand('formatBlock', false, '<blockquote>');
      return;
    }

    if (command === 'link') {
      this.createLink();
      return;
    }

    if (command === 'image') {
      this.insertImage();
      return;
    }

    document.execCommand(command, false, null);
  }

  insertImage() {
    const imageURI = prompt('Enter Image URL', 'http://');
    if (imageURI) {
      const inserted = document.execCommand('insertImage', false, imageURI);
      console.log('inserted', inserted)
      if (!inserted) {
        throw new Error('Invalid URL');
      }
    }
  }

  createLink() {
    const selection = document.getSelection();

    if (selection.anchorNode.parentElement.tagName === 'A') {
      const linkURL = prompt('Enter URL', selection.anchorNode.parentElement.getAttribute('href'));
      if (linkURL) {
        document.execCommand('createLink', false, linkURL);
      }
    } else {
      if (selection['type'] === 'None') {
        throw new Error('No selection made');
      } else {
        const linkURL = prompt('Enter URL', 'http://');
        if (linkURL) {
          document.execCommand('createLink', false, linkURL);
        }
      }
    }
  }
}
