import { waitFor } from '@testing-library/react';
import { renderWithRouter } from '@myorg/shared';
import { Dashboard } from '../layouts';

describe('renders layouts without crashing', () => {
  it('renders Dashboard', async () => {
    const { getByRole, getAllByText } = renderWithRouter(<Dashboard />);

    await waitFor(() => [getByRole('main')]);

    expect(getAllByText(/Dashboard/i)).not.toBeNull();
  });
});
