
import { render, screen } from '@testing-library/react';
import { Heart } from 'lucide-react';
import StatBlock from '../StatBlock';

describe('StatBlock', () => {
  it('renders stat name and value correctly', () => {
    render(
      <StatBlock
        name="Strength"
        value={15}
        modifier={2}
        icon={<Heart />}
      />
    );

    expect(screen.getByText('Strength')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  it('displays negative modifier correctly', () => {
    render(
      <StatBlock
        name="Agility"
        value={8}
        modifier={-1}
        icon={<Heart />}
      />
    );

    expect(screen.getByText('-1')).toBeInTheDocument();
  });

  it('applies correct styling for positive modifier', () => {
    render(
      <StatBlock
        name="Knowledge"
        value={12}
        modifier={3}
        icon={<Heart />}
      />
    );

    const modifier = screen.getByText('+3');
    expect(modifier).toHaveClass('bg-green-600/50');
  });

  it('applies correct styling for negative modifier', () => {
    render(
      <StatBlock
        name="Finesse"
        value={6}
        modifier={-2}
        icon={<Heart />}
      />
    );

    const modifier = screen.getByText('-2');
    expect(modifier).toHaveClass('bg-red-600/50');
  });
});
