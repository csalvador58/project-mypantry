export const regexTextHelper = (
  regex: RegExp,
  value: string
): boolean => {
  const result = regex.test(value);
  return result;
};
