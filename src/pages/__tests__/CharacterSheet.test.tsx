
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CharacterSheet from '../CharacterSheet';
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

const mockCharacter = {
  id: '456',
  name: 'Test Character',
  level: 5,
  current_hp: 25,
  max_hp: 30,
  hope: 3,
  stress: 1,
  stats: {
    agility: 12,
    strength: 15,
    finesse: 10,
    instinct: 14,
    presence: 11,
    knowledge: 13,
  },
  inventory: [],
  background: 'Test background',
  ancestry: { name: 'Human' },
  class: { name: 'Guardian' },
  subclass: { name: 'Valor' },
  community: { name: 'Highfall' },
};

// Mock react-router-dom useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ characterId: '456' }),
}));

// Mock Supabase
jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(() => Promise.resolve({ data: mockCharacter, error: null })),
        })),
      })),
      update: jest.fn(() => ({
        eq: jest.fn(() => Promise.resolve({ error: null })),
      })),
    })),
  },
}));

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

describe('CharacterSheet', () => {
  it('renders character name and level', async () => {
    render(<CharacterSheet />, { wrapper: createWrapper() });
    
    await screen.findByText('Test Character');
    expect(screen.getByText('Level 5')).toBeInTheDocument();
  });

  it('renders character stats', async () => {
    render(<CharacterSheet />, { wrapper: createWrapper() });
    
    await screen.findByText('Test Character');
    
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByText('Guardian - (Valor)')).toBeInTheDocument();
  });

  it('renders HP inputs', async () => {
    render(<CharacterSheet />, { wrapper: createWrapper() });
    
    await screen.findByText('Test Character');
    
    expect(screen.getByLabelText('Current HP')).toBeInTheDocument();
    expect(screen.getByLabelText('Max HP')).toBeInTheDocument();
  });

  it('renders inventory section', async () => {
    render(<CharacterSheet />, { wrapper: createWrapper() });
    
    await screen.findByText('Test Character');
    
    expect(screen.getByText('Inventory')).toBeInTheDocument();
    expect(screen.getByText('Add Item')).toBeInTheDocument();
  });
});
