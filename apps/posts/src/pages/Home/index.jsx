import Shell from '@myorg/shell';
import { Spinner } from '@myorg/posts-ui';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Shell>
      <Box p={2}>
        <Typography>
          This is the MyOrg Posts Homepage from <code>@myorg/posts</code>.
        </Typography>
        <Link to="/">Click to go back home.</Link>
        <Box>
          <Spinner />
        </Box>
      </Box>
    </Shell>
  );
}

export default Home;
