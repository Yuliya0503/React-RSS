const generateError = (
  setError: (error: boolean) => void,
  setErrorMessage: (errorMessage: string) => void
) => {
  try {
    throw new Error('Oops! Error!');
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      setErrorMessage(error.message);
      setError(true);
    } else {
      setError(true);
    }
  }
};

export default generateError;
