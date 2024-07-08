import * as Commands from '../../commands';

import { InsertCommand, ToggleCommand } from '../../commands/types';

export const ToggleCommands: Record<string, ToggleCommand> = {
  bold: Commands.STRONG,
  italic: Commands.EM,
  code: Commands.CODE,
  underline: Commands.UNDERLINE,
  strike: Commands.STRIKE,
  blockquote: Commands.BLOCKQUOTE,
  bullet_list: Commands.UL,
  ordered_list: Commands.OL,
  h1: Commands.H1,
  h2: Commands.H2,
  h3: Commands.H3,
  h4: Commands.H4,
  h5: Commands.H5,
  h6: Commands.H6,
  align_left: Commands.ALIGN_LEFT,
  align_center: Commands.ALIGN_CENTER,
  align_right: Commands.ALIGN_RIGHT,
  align_justify: Commands.ALIGN_JUSTIFY,
  superscript: Commands.SUPERSCRIPT,
  subscript: Commands.SUBSCRIPT,
};

export const InsertCommands: Record<string, InsertCommand> = {
  horizontal_rule: Commands.HORIZONTAL_RULE,
  format_clear: Commands.FORMAT_CLEAR,
  indent: Commands.INDENT,
  outdent: Commands.OUTDENT,
  undo: Commands.UNDO,
  redo: Commands.REDO,
};

export const Link = Commands.LINK;
export const Image = Commands.IMAGE;
export const TextColor = Commands.TEXT_COLOR;
export const TextBackgroundColor = Commands.TEXT_BACKGROUND_COLOR;
