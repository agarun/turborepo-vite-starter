import { waitFor } from '@testing-library/react';
import { renderWithRouter } from '@myorg/shared';
import App from '../App';

describe('renders without crashing', () => {
  it('renders homepage', async () => {
    const { getByRole, getAllByText } = renderWithRouter(<App />, {
      route: '/posts'
    });

    await waitFor(() => [getByRole('main')]);

    expect(getAllByText(/dashboard/i)).not.toBeNull();
  });
});
