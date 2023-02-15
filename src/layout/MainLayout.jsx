import React from 'react';
import {
  Autocomplete,
  Grid,
  List,
  TextField,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import ListData from '../components/ListData';

const listDemo = [
  { title: 'listItem1' },
  { title: 'listItem2' },
  { title: 'listItem3' },
  { title: 'listItem4' },
  { title: 'listItem5' },
  { title: 'listItem6' },
  { title: 'listItem7' },
  { title: 'listItem8' },
  { title: 'listItem9' },
];

export default function MainLayout({ header, listItems }) {
  return (
    <Grid data-testid='main-section' container columns={12}>
      <Grid item xs={12} textAlign='center'>
        <Typography component='h2'>{header}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          freeSolo
          id='search-input'
          data-testid='search-input'
          disableClearable
          options={listDemo.map((option) => option.title)}
          //   options={listDemo}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Search input'
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
            />
          )}
        />
      </Grid>
      <Grid item container xs={12}>
        <Grid item minwidth='345px' xs={6}>
          <List data-testid='list'>
            <ListData data={listDemo} />
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
}

MainLayout.propTypes = {
  header: PropTypes.string,
  listItems: PropTypes.array.isRequired,
};
