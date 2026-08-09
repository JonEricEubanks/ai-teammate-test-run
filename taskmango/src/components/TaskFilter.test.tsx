import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TaskFilter } from './TaskFilter';

const counts = { all: 5, active: 3, completed: 2 };

describe('TaskFilter', () => {
  it('displays counts for all three filters', () => {
    render(<TaskFilter current="all" onChange={() => {}} counts={counts} />);
    expect(screen.getByRole('button', { name: /all \(5\)/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /active \(3\)/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /completed \(2\)/i })).toBeInTheDocument();
  });

  it('calls onChange with the selected filter', async () => {
    const onChange = vi.fn();
    render(<TaskFilter current="all" onChange={onChange} counts={counts} />);
    await userEvent.click(screen.getByRole('button', { name: /active/i }));
    expect(onChange).toHaveBeenCalledWith('active');
  });

  it('counts are computed from the full task list (zero state)', () => {
    render(<TaskFilter current="all" onChange={() => {}} counts={{ all: 0, active: 0, completed: 0 }} />);
    expect(screen.getByRole('button', { name: /all \(0\)/i })).toBeInTheDocument();
  });
});
