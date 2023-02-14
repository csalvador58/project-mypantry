import * as React from 'react';
import {
  AppBar,
  Box,
  Container,
  Grid,
  Toolbar,
  Typography,
} from '@mui/material/';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';

function NavAppBar({ title }) {
  return (
    <>
      <AppBar position='static'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Grid container>
              <Grid item>
                <Box display='flex' alignItems='center'>
                  <FreeBreakfastIcon
                    sx={{
                      // display: { xs: 'flex' },
                      mr: 2,
                    }}
                  />
                  <Typography
                    data-testid='title-display'
                    variant='h6'
                    noWrap
                    component='a'
                    href='/'
                    sx={{
                      mr: 2,
                      // display: { xs: 'flex' },
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      letterSpacing: '.3rem',
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
                    {title}
                  </Typography>
                </Box>
              </Grid>
              {/* <Grid item>Hello</Grid> */}
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default NavAppBar;
