import type { FC } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';

import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';

interface CustomerBasicDetailsProps {
  location: string;
  note: string;
  quantity?: number;
  price?: number;
  lastUpdated?: string;
}

export const CustomerBasicDetails: FC<CustomerBasicDetailsProps> = (props) => {
  const { location, note, quantity, price, lastUpdated } = props;
  console.log('location, note, quantity, price, lastUpdated')
  console.log(location, note, quantity, price, lastUpdated)

  return (
    <Card>
      {/* <CardHeader title="Basic Details" /> */}
      <PropertyList>
        <PropertyListItem divider label='Note' value={note} />
        <PropertyListItem divider label='Quantity' value={quantity?.toString()} />
        <PropertyListItem divider label='Location' value={location} />
        <PropertyListItem divider label='Price Tracker' value={price?.toString()} />
        <PropertyListItem divider label='Last Updated' value={lastUpdated} />
      </PropertyList>
    </Card>
  );
};

CustomerBasicDetails.propTypes = {
  location: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
  quantity: PropTypes.number,
  price: PropTypes.number,
  lastUpdated: PropTypes.string,
};
