
import { render, screen } from '@testing-library/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';

describe('Card Components', () => {
  it('renders card with header and content', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Test content</p>
        </CardContent>
      </Card>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies custom className to Card', () => {
    render(
      <Card className="custom-class">
        <CardContent>Content</CardContent>
      </Card>
    );

    const card = screen.getByText('Content').closest('.custom-class');
    expect(card).toBeInTheDocument();
  });

  it('renders CardTitle with correct heading level', () => {
    render(
      <CardHeader>
        <CardTitle>My Title</CardTitle>
      </CardHeader>
    );

    const title = screen.getByRole('heading');
    expect(title).toHaveTextContent('My Title');
  });
});
