import * as Commands from '../../commands';

import { ToggleCommand } from '../../commands/types';
import { TBItems, TBHeadingItems } from '../../types';

export const ToggleCommands = new Map<TBItems | TBHeadingItems, ToggleCommand>();

ToggleCommands.set('bold', Commands.STRONG);
ToggleCommands.set('italic', Commands.EM);
ToggleCommands.set('code', Commands.CODE);
ToggleCommands.set('underline', Commands.UNDERLINE);
ToggleCommands.set('strike', Commands.STRIKE);
ToggleCommands.set('blockquote', Commands.BLOCKQUOTE);
ToggleCommands.set('bullet_list', Commands.UL);
ToggleCommands.set('ordered_list', Commands.OL);
ToggleCommands.set('h1', Commands.H1);
ToggleCommands.set('h2', Commands.H2);
ToggleCommands.set('h3', Commands.H3);
ToggleCommands.set('h4', Commands.H4);
ToggleCommands.set('h5', Commands.H5);
ToggleCommands.set('h6', Commands.H6);
ToggleCommands.set('align_left', Commands.ALIGN_LEFT);
ToggleCommands.set('align_center', Commands.ALIGN_CENTER);
ToggleCommands.set('align_right', Commands.ALIGN_RIGHT);
ToggleCommands.set('align_justify', Commands.ALIGN_JUSTIFY);

export const Link = Commands.LINK;
export const Image = Commands.IMAGE;
export const TextColor = Commands.TEXT_COLOR;
export const TextBackgroundColor = Commands.TEXT_BACKGROUND_COLOR;
