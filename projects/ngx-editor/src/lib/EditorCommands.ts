import { EditorState, Selection, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import {
  chainCommands, createParagraphNear, liftEmptyBlock,
  newlineInCode, splitBlock,
} from 'prosemirror-commands';
import { DOMParser } from 'prosemirror-model';

import { NgxEditorError } from 'ngx-editor/utils';
import MarkCommand from './commands/Mark';
import ListCommand from './commands/ListItem';
import LinkCommand, { LinkAttrs } from './commands/Link';
import HeadingCommand, { HeadingLevels } from './commands/Heading';
import ImageCommand, { ImageAttrs } from './commands/Image';
import TextColorCommand from './commands/TextColor';
import TextAlignCommand, { Align } from './commands/TextAlign';
import IndentCommand from './commands/Indent';

import { HTML } from './trustedTypesUtil';
import { isString } from './stringUtil';

const execMark = (name: string, toggle = false) => {
  return (state: EditorState, dispatch: (tr: Transaction) => void) => {
    const command = new MarkCommand(name);

    if (!toggle) {
      return command.apply()(state, dispatch);
    }

    return command.toggle()(state, dispatch);
  };
};

type FocusPosition = 'start' | 'end';

class EditorCommands {
  private view: EditorView;
  private state: EditorState;
  private tr: Transaction;

  constructor(view: EditorView) {
    if (!view) {
      throw new NgxEditorError('Required view to initialize commands.');
    }

    this.view = view;
    this.state = view.state;
    this.tr = this.view.state.tr;
  }

  private applyTrx = (tr?: Transaction) => {
    this.state = this.state.apply(tr ?? this.tr);
    this.tr = this.state.tr;
    this.tr.setMeta('APPLIED_TRX', true);
  };

  private dispatch = (tr: Transaction): void => {
    this.applyTrx(tr);
  };

  exec(): boolean {
    // No changes applied
    if (!this.tr.getMeta('APPLIED_TRX')) {
      return false;
    }

    const forceEmit = !this.view.state.doc.eq(this.state.doc);
    this.view.updateState(this.state);

    const tr = this.tr
      .setMeta('FORCE_EMIT', forceEmit);

    this.view.dispatch(tr);
    return true;
  }

  focus(position: FocusPosition = 'end'): this {
    const selection = position === 'start'
      ? Selection.atStart(this.state.doc)
      : Selection.atEnd(this.state.doc);

    this.tr.setSelection(selection);
    this.applyTrx();

    this.view.focus();
    return this;
  }

  scrollIntoView(): this {
    this.tr.scrollIntoView();
    this.applyTrx();
    return this;
  }

  insertText(text: string): this {
    this.tr.insertText(text);
    this.applyTrx();
    return this;
  }

  insertNewLine(): this {
    const newLineCommands = [newlineInCode, createParagraphNear, liftEmptyBlock, splitBlock];
    chainCommands(...newLineCommands)(this.state, this.dispatch);
    return this;
  }

  applyMark(name: string): this {
    execMark(name, false)(this.state, this.dispatch);
    return this;
  }

  toggleMark(name: string): this {
    execMark(name, true)(this.state, this.dispatch);
    return this;
  }

  bold(): this {
    execMark('strong')(this.state, this.dispatch);
    return this;
  }

  toggleBold(): this {
    execMark('strong', true)(this.state, this.dispatch);
    return this;
  }

  italics(): this {
    execMark('em')(this.state, this.dispatch);
    return this;
  }

  toggleItalics(): this {
    execMark('em', true)(this.state, this.dispatch);
    return this;
  }

  underline(): this {
    execMark('u')(this.state, this.dispatch);
    return this;
  }

  toggleUnderline(): this {
    execMark('u', true)(this.state, this.dispatch);
    return this;
  }

  strike(): this {
    execMark('s')(this.state, this.dispatch);
    return this;
  }

  toggleStrike(): this {
    execMark('s', true)(this.state, this.dispatch);
    return this;
  }

  code(): this {
    execMark('code')(this.state, this.dispatch);
    return this;
  }

  toggleCode(): this {
    execMark('code', true)(this.state, this.dispatch);
    return this;
  }

  superscript(): this {
    execMark('sup')(this.state, this.dispatch);
    return this;
  }

  subscript(): this {
    execMark('sub')(this.state, this.dispatch);
    return this;
  }

  toggleOrderedList(): this {
    const command = new ListCommand(false);
    command.toggle()(this.state, this.dispatch);
    return this;
  }

  toggleBulletList(): this {
    const command = new ListCommand(true);
    command.toggle()(this.state, this.dispatch);
    return this;
  }

  toggleHeading(level: HeadingLevels): this {
    const command = new HeadingCommand(level);
    command.toggle()(this.state, this.dispatch);
    return this;
  }

  insertLink(text: string, attrs: LinkAttrs): this {
    const command = new LinkCommand();
    command.insert(text, attrs)(this.state, this.dispatch);
    return this;
  }

  updateLink(attrs: LinkAttrs): this {
    const command = new LinkCommand();
    command.update(attrs)(this.state, this.dispatch);
    return this;
  }

  insertImage(src: string, attrs: ImageAttrs = {}): this {
    const command = new ImageCommand();
    command.insert(src, attrs)(this.state, this.dispatch);
    return this;
  }

  textColor(color: string): this {
    const command = new TextColorCommand('text_color');
    command.apply({ color })(this.state, this.dispatch);
    return this;
  }

  backgroundColor(color: string): this {
    const command = new TextColorCommand('text_background_color');
    command.apply({ backgroundColor: color })(this.state, this.dispatch);
    return this;
  }

  removeTextColor(): this {
    const command = new TextColorCommand('text_color');
    command.remove()(this.state, this.dispatch);
    return this;
  }

  removeBackgroundColor(): this {
    const command = new TextColorCommand('text_background_color');
    command.remove()(this.state, this.dispatch);
    return this;
  }

  align(p: Align): this {
    const command = new TextAlignCommand(p);
    command.toggle()(this.state, this.dispatch);
    return this;
  }

  insertHTML(html: HTML): this {
    const { selection, schema, tr } = this.state;
    const { from, to } = selection;

    const element = document.createElement('div');
    element.innerHTML = isString(html) ? (html as string).trim() : html as any;
    const slice = DOMParser.fromSchema(schema).parseSlice(element);

    const transaction = tr.replaceRange(from, to, slice);
    this.applyTrx(transaction);

    return this;
  }

  indent(): this {
    const command = new IndentCommand('increase');
    command.insert()(this.state, this.dispatch);
    return this;
  }

  outdent(): this {
    const command = new IndentCommand('decrease');
    command.insert()(this.state, this.dispatch);
    return this;
  }
}

export default EditorCommands;
