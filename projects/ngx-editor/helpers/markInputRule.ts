import { InputRule } from 'prosemirror-inputrules';
import { MarkType } from 'prosemirror-model';

export const markInputRule = (regexp: RegExp, markType: MarkType, attrs?: Record<string, unknown>): InputRule => {
  return new InputRule(regexp, (state, match, start, end) => {
    const { tr } = state;

    const from = start;
    let to = end;

    if (match[2]) {
      const textStart = start + match[0].indexOf(match[2]);
      const textEnd = textStart + match[2].length;

      if (textEnd < end) {
        tr.delete(textEnd, end);
      }

      if (textStart > start) {
        tr.delete(start, textStart);
      }

      to = start + match[2].length;
    }

    return tr.addMark(from, to, markType.create(attrs));
  });
};

export default markInputRule;
