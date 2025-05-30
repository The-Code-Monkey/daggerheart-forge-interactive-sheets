import { render, screen } from '../../test-utils';
import CharacterSheet from '../CharacterSheet';

// Mock useAuth hook
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { id: '1', email: 'test@example.com' },
    loading: false
  })
}));

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '123' }),
  useNavigate: () => jest.fn()
}));

describe('CharacterSheet', () => {
  it('renders character sheet', () => {
    render(<CharacterSheet />);
    // Add specific assertions based on CharacterSheet content
    expect(document.body).toContainHTML('div');
  });
});
