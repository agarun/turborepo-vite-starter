import React from 'react';
import { CssBaseline } from '@mui/material';
import { getScrollbarSize } from '@myorg/shared';
import { Global, css } from '@emotion/react';
import { theme } from '@myorg/shared';

function Baseline() {
  return (
    <>
      <CssBaseline />
      <Global
        styles={css`
          :root {
            --scrollbar-size: ${getScrollbarSize(document)}px;
          }
          body {
            font-family: ${theme.typography.fontFamily};
          }
          code {
            padding: ${theme.spacing(0.25, 0.75)};
            color: ${theme.palette.primary.dark};
            background-color: ${theme.palette.common.white};
            border-radius: ${theme.shape.borderRadius}px;
          }
        `}
      />
    </>
  );
}

export default Baseline;
