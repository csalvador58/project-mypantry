import React, { useState } from 'react';
import { Tab, Tabs, Toolbar } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DoorSlidingIcon from '@mui/icons-material/DoorSliding';
import CreateIcon from '@mui/icons-material/Create';

export default function BottomNav() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Toolbar disableGutters>
      <Tabs
        data-testid='bottom-nav'
        value={value}
        onChange={handleChange}
        aria-label='icon label tabs example'
        textColor='inherit'
        indicatorColor='secondary'
      >
        <Tab
          sx={{ fontSize: '0.4em' }}
          icon={<DoorSlidingIcon />}
          label='Pantry'
        />
        <Tab
          sx={{ fontSize: '0.4em' }}
          icon={<MenuBookIcon />}
          label='Receipe'
        />
        <Tab
          sx={{ fontSize: '0.4em' }}
          icon={<CreateIcon />}
          label='Create Recipe'
        />
      </Tabs>
    </Toolbar>
  );
}
