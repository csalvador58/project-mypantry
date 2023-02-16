import React from 'react';
import { IconButton, List, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ListData({ data }) {
  const onClickHandler = () => {};
  const renderRow = data.map((element, index) => {
    return (
      <ListItem
        key={index}
        xs={6}
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
    )
  });

  return <List data-testid='data-list'>{renderRow};</List>;
}
