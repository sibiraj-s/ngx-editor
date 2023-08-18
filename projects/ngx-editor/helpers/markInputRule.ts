import { InputRule } from 'prosemirror-inputrules';
import { MarkType } from 'prosemirror-model';

export const markInputRule = (regexp: RegExp, markType: MarkType, attrs?: Record<string, unknown>): InputRule => {
  return new InputRule(regexp, (state, match, start, end) => {
    const { tr } = state;

    const from = start;
    let to = end;

    const [fullMatch, , content] = match;
    const noOfStartSpaces = fullMatch.search(/\S/);

    if (content) {
      const textStart = start + fullMatch.indexOf(content);
      const textEnd = textStart + content.length;

      if (textEnd < end) {
        tr.delete(textEnd, end);
      }

      if (textStart > start) {
        tr.delete(start + noOfStartSpaces, textStart);
      }

      to = start + content.length + noOfStartSpaces;
    }

    tr.addMark(from, to, markType.create(attrs));
    tr.removeStoredMark(markType);

    return tr;
  });
};

export default markInputRule;
