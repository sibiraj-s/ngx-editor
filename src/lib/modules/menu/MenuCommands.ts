import * as Commands from '../../commands';

import { SimpleCommand } from '../../commands/types';

export const SimpleCommands = new Map<string, SimpleCommand>();

SimpleCommands.set('bold', Commands.STRONG);
SimpleCommands.set('italic', Commands.EM);
SimpleCommands.set('code', Commands.CODE);
SimpleCommands.set('blockquote', Commands.BLOCKQUOTE);
SimpleCommands.set('bullet_list', Commands.UL);
SimpleCommands.set('ordered_list', Commands.OL);
SimpleCommands.set('h1', Commands.H1);
SimpleCommands.set('h2', Commands.H2);
SimpleCommands.set('h3', Commands.H3);
SimpleCommands.set('h4', Commands.H4);
SimpleCommands.set('h5', Commands.H5);
SimpleCommands.set('h6', Commands.H6);
SimpleCommands.set('align_left', Commands.ALIGN_LEFT);
SimpleCommands.set('align_center', Commands.ALIGN_CENTER);
SimpleCommands.set('align_right', Commands.ALIGN_RIGHT);
SimpleCommands.set('align_justify', Commands.ALIGN_JUSTIFY);

export const Link = Commands.LINK;
export const Image = Commands.IMAGE;
export const TextColor = Commands.TEXT_COLOR;
export const TextBackgroundColor = Commands.TEXT_BACKGROUND_COLOR;
