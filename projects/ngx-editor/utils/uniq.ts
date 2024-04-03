const uniq = (): string => {
  const timeStamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `${timeStamp}${random}`;
};

export default uniq;
