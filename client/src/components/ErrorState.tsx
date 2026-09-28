interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-5">
      <p className="text-sm text-red-700">{message}</p>

      {onRetry && (
        <button onClick={onRetry} className="mt-3 text-sm font-medium text-red-800 underline">
          Retry
        </button>
      )}
    </div>
  );
}
