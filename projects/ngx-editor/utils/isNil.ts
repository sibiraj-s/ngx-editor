const isNil = (val: any): boolean => {
  return typeof val === 'undefined' || val === null;
};

export default isNil;
