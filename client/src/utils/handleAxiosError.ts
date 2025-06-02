// src/utils/handleAxiosError.ts

export function handleAxiosError(error: unknown): string {
  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    error.response &&
    typeof error.response === "object" &&
    "data" in error.response &&
    error.response.data &&
    typeof error.response.data === "object" &&
    "error" in error.response.data
  ) {
    return (error as { response: { data: { error: string } } }).response.data.error;
  }

  return "Something went wrong";
}
