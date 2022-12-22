import { makeStyles } from '@mui/styles';

const appBarHeight = 64;

export const useStyles = makeStyles(theme => ({
  main: {
    background: theme.palette.secondary.light,
    height: `calc(100vh - ${appBarHeight}px)`
  }
}));
