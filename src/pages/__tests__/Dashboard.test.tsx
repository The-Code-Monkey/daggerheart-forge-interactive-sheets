import { render, screen } from '../../test-utils';
import Dashboard from '../Dashboard';

// Mock useAuth hook
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { id: '1', email: 'test@example.com' },
    loading: false
  })
}));

describe('Dashboard', () => {
  it('renders dashboard content', () => {
    render(<Dashboard />);
    // Add specific assertions based on Dashboard content
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });
});
