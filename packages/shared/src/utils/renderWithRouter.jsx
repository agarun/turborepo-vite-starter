import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../themes';

function Provider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  return {
    ...render(ui, {
      wrapper: ({ children }) => (
        <Provider>
          <Router history={history}>{children}</Router>
        </Provider>
      )
    }),
    history
  };
}

export function renderWithRouterAndProvider() {}
