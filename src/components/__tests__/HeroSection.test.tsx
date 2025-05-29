
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HeroSection from '../HeroSection';

const HeroSectionWithRouter = () => (
  <BrowserRouter>
    <HeroSection />
  </BrowserRouter>
);

describe('HeroSection', () => {
  it('renders main heading', () => {
    render(<HeroSectionWithRouter />);
    
    expect(screen.getByText('Your Digital')).toBeInTheDocument();
    expect(screen.getByText('Adventure Hub')).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(<HeroSectionWithRouter />);
    
    expect(screen.getByText(/Create characters, manage campaigns/)).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    render(<HeroSectionWithRouter />);
    
    expect(screen.getByText('Start Building')).toBeInTheDocument();
    expect(screen.getByText('View Demo')).toBeInTheDocument();
  });

  it('renders statistics', () => {
    render(<HeroSectionWithRouter />);
    
    expect(screen.getByText('10K+')).toBeInTheDocument();
    expect(screen.getByText('Characters Created')).toBeInTheDocument();
    expect(screen.getByText('500+')).toBeInTheDocument();
    expect(screen.getByText('Active Campaigns')).toBeInTheDocument();
  });
});
