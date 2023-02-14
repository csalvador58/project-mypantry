import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material/Box';

export default function ListData({ data }) {
  const renderRow = data.map((element, index) => {
    <ListItem key={index} component='div' disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>;
  });

  return <List>{renderRow};</List>;
}
