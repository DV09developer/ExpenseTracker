import axios from "axios";

export const getErrorMessage = (
  error: unknown
): string => {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ||
      error.message ||
      "Something went wrong"
    );
  }

  return "Unexpected error occurred";
};