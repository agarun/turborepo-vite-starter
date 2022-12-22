import * as React from 'react';
import { Box, Card, Typography } from '@mui/material';
import { apps } from '@myorg/shared';
import { Dashboard } from '@myorg/shell';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Dashboard>
      <Box p={2}>
        {apps.map(app => (
          <Link
            key={app.description}
            to={app.href}
            style={{ textDecoration: 'none' }}
          >
            <Card sx={{ m: 2, p: 2, display: 'flex' }}>
              <app.icon sx={{ m: 1 }} />
              <Typography sx={{ m: 1, fontWeight: 500 }} color="textPrimary">
                {app.description}
              </Typography>
            </Card>
          </Link>
        ))}
      </Box>
    </Dashboard>
  );
}
