interface PriorityChipsProps {
  selected: "low" | "normal" | "high" | "urgent";
  onChange: (priority: "low" | "normal" | "high" | "urgent") => void;
}

export function PriorityChips({ selected, onChange }: PriorityChipsProps) {
  const priorities = [
    { value: "low" as const, label: "Niedrig" },
    { value: "normal" as const, label: "Normal" },
    { value: "high" as const, label: "Hoch" },
    { value: "urgent" as const, label: "Frist läuft bald ab" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {priorities.map((priority) => (
        <button
          key={priority.value}
          type="button"
          onClick={() => onChange(priority.value)}
          className={`
            px-4 py-2.5 rounded-full text-sm transition-all duration-200
            ${
              selected === priority.value
                ? "bg-gray-900 text-white shadow-sm"
                : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            }
          `}
        >
          {priority.label}
        </button>
      ))}
    </div>
  );
}
