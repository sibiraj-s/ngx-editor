import { Injectable } from '@angular/core';
import * as Utils from '../utils/ngx-editor.utils';

@Injectable()
export class CommandExecutorService {

  savedSelection: any = undefined;

  /**
   * executes command from the toolbar
   *
   * @param command command to be executed
   */
  execute(command: string): void {

    if (command === 'enableObjectResizing') {
      document.execCommand('enableObjectResizing', true, true);
      return;
    }

    if (command === 'blockquote') {
      document.execCommand('formatBlock', false, '<blockquote>');
      return;
    }

    if (command === 'removeBlockquote') {
      document.execCommand('formatBlock', false, 'div');
      return;
    }

    // if (command === 'link') {
    //   this.createLink();
    //   return;
    // }

    if (command === 'image') {
      this.insertImage();
      return;
    }

    document.execCommand(command, false, null);
  }

  private insertImage(): void {
    const imageURI = prompt('Enter Image URL', 'http://');
    if (imageURI) {
      const inserted = document.execCommand('insertImage', false, imageURI);
      if (!inserted) {
        throw new Error('Invalid URL');
      }
    }
    return;
  }

  // private createLink(): void {
  //   const selection = document.getSelection();

  //   if (selection.anchorNode.parentElement.tagName === 'A') {
  //     const linkURL = prompt('Enter URL', selection.anchorNode.parentElement.getAttribute('href'));
  //     if (linkURL) {
  //       document.execCommand('createLink', false, linkURL);
  //     }
  //   } else {
  //     if (selection['type'] === 'None') {
  //       throw new Error('No selection made');
  //     } else {
  //       const linkURL = prompt('Enter URL', 'http://');
  //       if (linkURL) {
  //         document.execCommand('createLink', false, linkURL);
  //       }
  //     }
  //   }
  //   return;
  // }

  createLink(params: any): void {

    if (this.savedSelection) {
      /**
       * check whether the saved selection contains a range or plain selection
       */
      if (params.urlNewTab) {
        const newUrl = '<a href="' + params.urlLink + '" target="_blank">' + params.urlText + '</a>';

        if (document.getSelection().type !== 'Range') {
          const restored = Utils.restoreSelection(this.savedSelection);
          if (restored) {
            document.execCommand('insertHTML', false, newUrl);
          }
          document.execCommand('insertHTML', false, newUrl);
        } else {
          throw new Error('Only new links can be inserted. You cannot edit URL`s');
        }
      } else {
        const restored = Utils.restoreSelection(this.savedSelection);
        if (restored) {
          document.execCommand('createLink', false, params.urlLink);
        }
      }
    } else {
      throw new Error('Range out of the editor');
    }

    return;
  }

}
