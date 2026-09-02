import { screen, render } from '@testing-library/react';
import { BountyCard } from './BountyCard';
import type { TBounty } from '../types';
import { MemoryRouter } from 'react-router-dom';

const mockBounty = {
  id: '1',
  title: 'build a react dashboard',
  bountyBTC: 0.1,
  deadline: new Date().toISOString(),
  description: 'Test Bounty Description',
  category: 'Test Category',
  difficulty: 'Easy',
} as TBounty;

const renderBountyCard = () => {
  return render(
    <MemoryRouter>
      <BountyCard bounty={mockBounty} />
    </MemoryRouter>,
  );
};

describe('Bounty card', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the card ui', () => {
    renderBountyCard();

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: /build a react dashboard/i,
      }),
    ).toBeInTheDocument();

    // expect(screen.getByText)

    const submitLink = screen.getByRole('link', { name: /submit solution/i });
    expect(submitLink).toBeInTheDocument();
  });
});
