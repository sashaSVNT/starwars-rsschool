export const transformFieldKey = (key: string) => {
  return key.split('_').join(' ');
};
