interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const normalized = status.toLowerCase();

  let className = 'bg-slate-100 text-slate-700';

  if (['running', 'active', 'completed', 'success'].includes(normalized)) {
    className = 'bg-green-100 text-green-700';
  }

  if (['idle', 'pending', 'planned'].includes(normalized)) {
    className = 'bg-yellow-100 text-yellow-700';
  }

  if (['fault', 'failed', 'rejected', 'stopped'].includes(normalized)) {
    className = 'bg-red-100 text-red-700';
  }

  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${className}`}>{status}</span>
  );
}
