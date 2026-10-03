import type {
  TrustedTypePolicy, TrustedTypePolicyFactory, TrustedTypesWindow, TrustedHTML,
} from 'trusted-types/lib';
import { isString } from './stringUtil';

export const getTrustedTypes = (): TrustedTypePolicyFactory | undefined => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  return (window as unknown as TrustedTypesWindow).trustedTypes;
};

export const isTrustedHtml = (value: unknown): boolean => {
  const tt = getTrustedTypes();
  return Boolean(tt && typeof tt.isHTML === 'function' && tt.isHTML(value));
};

export const isHtml = (value: unknown): boolean => {
  return isString(value) || isTrustedHtml(value);
};

export type HTML = string | TrustedHTML;

export const TRUSTED_TYPES_POLICY_NAME = 'ngx-editor';

type HTMLPolicy = Pick<TrustedTypePolicy, 'createHTML'>;

let policy: HTMLPolicy | null | undefined;

// Lazily created so apps that never pass HTML don't need to allow the policy.
// HTML is only parsed inside an inert document (see `parseHTML`) and then
// filtered through the schema, so passing it through unchanged is safe.
const getPolicy = (): HTMLPolicy | null => {
  if (policy === undefined) {
    policy = null;
    const tt = getTrustedTypes();
    if (tt && typeof tt.createPolicy === 'function') {
      try {
        policy = tt.createPolicy(TRUSTED_TYPES_POLICY_NAME, {
          createHTML: (html: string) => html,
        });
      } catch {
        // policy not allowed by the CSP `trusted-types` directive
      }
    }
  }

  return policy;
};

const toTrustedHtml = (html: HTML): HTML => {
  if (isTrustedHtml(html)) {
    return html;
  }

  return getPolicy()?.createHTML(html as string) ?? html;
};

// Parses HTML in a separate document which has no browsing context,
// so scripts and event handlers (e.g. <img onerror>) never run and no
// resources are loaded.
export const parseHTML = (html: HTML): HTMLElement => {
  const doc = document.implementation.createHTMLDocument('');
  const el = doc.createElement('div');
  el.innerHTML = toTrustedHtml(html) as string;
  return el;
};
