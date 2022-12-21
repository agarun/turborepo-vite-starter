import React from 'react';
import { theme } from '@myorg/shared';
import { Baseline } from '@myorg/shell';
import { ThemeProvider } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom';
import '@myorg/shared/fonts/inter/inter.css';

export const decorators = [
  Story => (
    <MemoryRouter initialEntries={['/']}>
      <Baseline />
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    </MemoryRouter>
  )
];
