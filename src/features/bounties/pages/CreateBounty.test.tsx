import { render, screen } from '@testing-library/react';
import { describe, it, jest, beforeEach } from '@jest/globals';
import { CreateBountyPage } from './CreateBountyPage';

jest.mock('../../../hooks/useAppContext', () => ({
  useAppContext: jest.fn(() => ({
    user: { success: true, user: { companyName: 'Acme Corp' } },
  })),
}));

jest.mock('sonner', () => ({
  toast: { error: jest.fn(), success: jest.fn() },
}));

jest.mock('../../../services/bounties/bountyService', () => ({
  bountyService: { createBounty: jest.fn() },
}));

const renderCreateBountyPage = () => render(<CreateBountyPage />);

describe('Create bounty page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form fields and ui', () => {
    renderCreateBountyPage();

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/difficulty/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/deadline/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /publish bounty/i }),
    ).toBeInTheDocument();
  });
});
