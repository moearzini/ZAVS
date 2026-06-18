interface StatusBadgeProps {
  status: "new" | "assigned" | "in_progress" | "waiting" | "completed";
  className?: string;
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const statusConfig = {
    new: {
      label: "Neu",
      color: "bg-blue-50 text-blue-700 border-blue-200",
    },
    assigned: {
      label: "Zugeordnet",
      color: "bg-purple-50 text-purple-700 border-purple-200",
    },
    in_progress: {
      label: "In Bearbeitung",
      color: "bg-amber-50 text-amber-700 border-amber-200",
    },
    waiting: {
      label: "Warten auf Rückmeldung",
      color: "bg-orange-50 text-orange-700 border-orange-200",
    },
    completed: {
      label: "Abgeschlossen",
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-all ${config.color} ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-current"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
      </span>
      {config.label}
    </span>
  );
}
