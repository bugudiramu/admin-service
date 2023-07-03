const isValidaInput = (input: any) => {
  input = input.trim();
  if (input === null || input === undefined || input === '') return false;
  return true;
};

export default isValidaInput;
