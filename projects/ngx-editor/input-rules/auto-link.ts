import { InputRule } from 'prosemirror-inputrules';

// automatically convert text to link while typing
export const autoLink = (): InputRule => {
  // urls with a protocol and a host, or domains ending with an alphabetic tld (so numbers like 3.14 are skipped)
  const urlRegEx = /(?:https?:\/\/[\w-]+(?:\.[\w-]+)*(?::\d+)?|(?:[\w-]+\.)+[a-z]{2,}(?::\d+)?)(?:\/\S*)?$/i;

  return new InputRule(urlRegEx, (state, match, start, end) => {
    const { schema } = state;

    const tr = state.tr.insertText(match[0], start, end); // Replace existing text with entire match
    const mark = schema.marks['link'].create({ href: match[0] });

    return tr.addMark(start, start + match[0].length, mark);
  });
};
