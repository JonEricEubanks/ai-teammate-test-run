import type { Filter } from '../types';

interface Counts {
  all: number;
  active: number;
  completed: number;
}

interface Props {
  current: Filter;
  onChange: (filter: Filter) => void;
  counts: Counts;
}

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export function TaskFilter({ current, onChange, counts }: Props) {
  return (
    <nav className="filter-bar" aria-label="Task filters">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          className={current === f.value ? 'active' : ''}
          onClick={() => onChange(f.value)}
        >
          {f.label} ({counts[f.value]})
        </button>
      ))}
    </nav>
  );
}
