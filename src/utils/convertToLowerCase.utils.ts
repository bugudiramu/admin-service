const convertToLowerCase = (str: string): string => {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string.');
  }

  if (str.length === 0) {
    return '';
  }

  const convertToLowerCase = str.toLowerCase();
  return convertToLowerCase;
};

export default convertToLowerCase;
