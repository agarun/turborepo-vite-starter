import {
  Box,
  AppBar,
  Button,
  Toolbar,
  IconButton,
  Typography
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useStyles } from './styles';

export default function Header() {
  const history = useHistory();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <DashboardIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            This is the Dashboard layout from <code>@myorg/shell</code>
          </Typography>
          <Button color="inherit" onClick={() => history.push('/login')}>
            Login &rarr;
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export function Dashboard({ children }) {
  const classes = useStyles();

  return (
    <Box>
      <Header />
      <main role="main" className={classes.main}>
        {children}
      </main>
    </Box>
  );
}
