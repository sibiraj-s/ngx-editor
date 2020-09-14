const flatDeep = (arr: any[], d = 1): any[] => {
  return d > 0
    ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
    : arr.slice();
};

export default flatDeep;
