const camelToDashed = (str: string): string => {
  return str.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
};

const cleanObject = (obj: { [key: string]: any }): { [key: string]: any } => {
  const cleanObj = {};

  Object.keys(obj).forEach((prop) => {
    if (obj[prop]) {
      cleanObj[prop] = obj[prop];
    }
  });

  return cleanObj;
};

const toStyleString = (obj: Partial<CSSStyleDeclaration>): string => {
  const styles = cleanObject(obj);
  return Object.entries(styles).map(([k, v]) => `${camelToDashed(k)}:${v}`).join(';');
};

export default toStyleString;
