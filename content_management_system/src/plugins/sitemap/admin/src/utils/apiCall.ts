export const apiCall = async <T>(
  apiFunction: () => Promise<T>,
  onSuccess: (response: T) => void,
  onError: (error: unknown) => void
): Promise<void> => {
  try {
    const response = await apiFunction();
    onSuccess(response);
  } catch (error) {
    onError(error);
  }
};
  