import React from 'react';
import { render } from '@testing-library/react';
import Calculator from '../components/Calculator';

describe('charts Calculator', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<Calculator initialNumber={56} />);
    expect(getByText('00056')).toBeInTheDocument();
  });
});
