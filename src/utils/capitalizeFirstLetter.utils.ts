const capitalizeFirstLetter = (str: string): string => {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string.');
  }

  if (str.length === 0) {
    return '';
  }

  const capitalized = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  return capitalized;
};

export default capitalizeFirstLetter;
