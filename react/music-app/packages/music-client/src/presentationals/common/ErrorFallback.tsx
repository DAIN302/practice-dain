interface Props {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({ error, resetErrorBoundary }: Props) {
  return (
    <div>
      <h1>
        {isApiError(error)
          ? error.response.errors[0].message
          : "something is wrong"}
      </h1>
      <button onClick={() => resetErrorBoundary()}>Try Again</button>
    </div>
  );
}

// Api error 인지 아닌지 구분해서 처리
function isApiError(
  error: any
): error is { response: { errors: { message: string }[] } } {
  return error.response?.errors?.length > 0;
}
