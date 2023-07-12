import { TrustedTypePolicyFactory, TrustedTypesWindow, TrustedHTML } from 'trusted-types/lib';
import { isString } from './stringUtil';

export const getTrustedTypes = (): TrustedTypePolicyFactory | undefined => {
  return (window as unknown as TrustedTypesWindow).trustedTypes;
};

export const isTrustedHtml = (value: unknown): boolean => {
  return getTrustedTypes()?.isHTML(value) ?? false;
};

export const isHtml = (value: unknown): boolean => {
  return isString(value) || isTrustedHtml(value);
};

export type HTML = string | TrustedHTML;
