import React, { useState } from 'react';
import { Tab, Tabs, Toolbar } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';

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
        <Tab sx={{ fontSize: '0.4em' }} icon={<PhoneIcon />} label='Pantry' />
        <Tab
          sx={{ fontSize: '0.4em' }}
          icon={<FavoriteIcon />}
          label='Receipe'
        />
        <Tab
          sx={{ fontSize: '0.4em' }}
          icon={<PersonPinIcon />}
          label='Create Recipe'
        />
      </Tabs>
    </Toolbar>
  );
}
