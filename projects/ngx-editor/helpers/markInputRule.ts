import { InputRule } from 'prosemirror-inputrules';
import { MarkType } from 'prosemirror-model';

const WHITE_SPACE_COUNT = 1;

export const markInputRule = (regexp: RegExp, markType: MarkType, attrs?: Record<string, unknown>): InputRule => {
  return new InputRule(regexp, (state, match, start, end) => {
    const { tr } = state;

    const from = start;
    let to = end;

    const [fullMatch, , content] = match;

    if (content) {
      const textStart = start + fullMatch.indexOf(content);
      const textEnd = textStart + content.length;

      if (textEnd < end) {
        tr.delete(textEnd, end);
      }

      if (textStart > start) {
        tr.delete(start + WHITE_SPACE_COUNT, textStart);
      }

      to = start + content.length + WHITE_SPACE_COUNT;
    }

    tr.addMark(from, to, markType.create(attrs));
    tr.removeStoredMark(markType);

    return tr;
  });
};

export default markInputRule;
