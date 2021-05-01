const isNil = (val: unknown): boolean => {
  return typeof val === 'undefined' || val === null;
};

export default isNil;
