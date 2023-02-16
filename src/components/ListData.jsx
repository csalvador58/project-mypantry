import React from 'react';
import { IconButton, List, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';

export default function ListData({ data }) {
  const onClickHandler = () => {};
  const renderRow = data.map((element, index) => {
    return (
      <Box width='50%'>
        <ListItem
          key={index}
          secondaryAction={
            <IconButton edge='end' aria-label='delete' onClick={onClickHandler}>
              <DeleteIcon
                aria-hidden='false'
                aria-label='Delete Icon'
                role='img'
                title='Delete Icon'
              />
            </IconButton>
          }
        >
          <ListItemText primary={`Item ${index + 1}`} secondary='Line 2' />
        </ListItem>
      </Box>
    );
  });

  return (
    <List
      data-testid='data-list'
      sx={{
        maxHeight: '50vh',
        overflow: 'auto',
        display: 'flex',
        flexFlow: 'column wrap',
      }}
    >
      {renderRow}
    </List>
  );
}
