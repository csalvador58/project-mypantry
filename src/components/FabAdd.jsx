import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function FabAdd() {
  return (
    <React.Fragment>
      <CssBaseline />
      {/* TODO: Fix theme type in GlobalStyles */}
      <GlobalStyles
        styles={(theme) => ({
          body: { backgroundColor: theme.palette.background.paper },
        })}
      />

      <Fab
      data-testid='fab-add'
        color='secondary'
        sx={{
          position: 'absolute',
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2),
        }}
      >
        <AddIcon />
      </Fab>
    </React.Fragment>
  );
}
