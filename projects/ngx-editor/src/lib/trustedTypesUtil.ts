import type { TrustedTypePolicyFactory, TrustedTypesWindow, TrustedHTML } from 'trusted-types/lib';
import { isString } from './stringUtil';

export const getTrustedTypes = (): TrustedTypePolicyFactory | undefined => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  return (window as unknown as TrustedTypesWindow).trustedTypes;
};

export const isTrustedHtml = (value: unknown): boolean => {
  const tt = getTrustedTypes();
  return !!(tt && typeof tt.isHTML === 'function' && tt.isHTML(value));
};

export const isHtml = (value: unknown): boolean => {
  return isString(value) || isTrustedHtml(value);
};

export type HTML = string | TrustedHTML;
