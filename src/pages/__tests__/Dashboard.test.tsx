
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from '../Dashboard';
import { AuthContext } from '@/contexts/AuthContext';

const mockUser = {
  id: '123',
  user_metadata: { username: 'testuser' },
  email: 'test@example.com',
};

const mockAuthContext = {
  user: mockUser,
  signOut: jest.fn(),
  signIn: jest.fn(),
  signUp: jest.fn(),
  loading: false,
};

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={mockAuthContext}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

// Mock Supabase
jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          order: jest.fn(() => ({
            then: jest.fn(() => Promise.resolve({ data: [], error: null })),
          })),
        })),
      })),
    })),
  },
}));

describe('Dashboard', () => {
  it('renders welcome message with username', () => {
    render(<Dashboard />, { wrapper: createWrapper() });
    
    expect(screen.getByText('Welcome back, testuser!')).toBeInTheDocument();
  });

  it('renders character overview cards', () => {
    render(<Dashboard />, { wrapper: createWrapper() });
    
    expect(screen.getByText('Characters')).toBeInTheDocument();
    expect(screen.getByText('Campaigns')).toBeInTheDocument();
    expect(screen.getByText('Rule Books')).toBeInTheDocument();
  });

  it('renders sign out button', () => {
    render(<Dashboard />, { wrapper: createWrapper() });
    
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  it('renders create character button when under limit', () => {
    render(<Dashboard />, { wrapper: createWrapper() });
    
    expect(screen.getByText('Create Character')).toBeInTheDocument();
  });
});
