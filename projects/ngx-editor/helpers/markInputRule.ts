import { InputRule } from 'prosemirror-inputrules';
import { MarkType } from 'prosemirror-model';

const MATCH_ALL = 0;
const MATCH_CONTENT_IDX = 1;
const MATCH_CONTENT_NAMED = 'content';

export const markInputRule = (regexp: RegExp, markType: MarkType, attrs?: Record<string, unknown>): InputRule => {
  return new InputRule(regexp, (state, match, start, end) => {
    const { tr } = state;

    const from = start;
    let to = end;

    const content = match[MATCH_CONTENT_NAMED] ?? match[MATCH_CONTENT_IDX];
    if (content) {
      const textStart = start + match[MATCH_ALL].indexOf(content);
      const textEnd = textStart + content.length;

      if (textEnd < end) {
        tr.delete(textEnd, end);
      }

      if (textStart > start) {
        tr.delete(start, textStart);
      }

      to = start + content.length;
    }

    return tr.addMark(from, to, markType.create(attrs));
  });
};

export default markInputRule;
