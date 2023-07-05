import type { FC } from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';

import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';

interface PantryBasicDetailsProps {
  location: string;
  note: string;
  quantity?: number;
  price?: number;
  updatedAt?: string;
}

export const PantryBasicDetails: FC<PantryBasicDetailsProps> = (props) => {
  const { location, note, quantity, price, updatedAt } = props;

  return (
    <Card>
      <PropertyList>
        <PropertyListItem divider label='Note' value={note} />
        <PropertyListItem divider label='Quantity' value={quantity?.toString()} />
        <PropertyListItem divider label='Location' value={location} />
        <PropertyListItem divider label='Price Tracker' value={price?.toString()} />
        <PropertyListItem divider label='Last Updated' value={updatedAt} />
      </PropertyList>
    </Card>
  );
};

PantryBasicDetails.propTypes = {
  location: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
  quantity: PropTypes.number,
  price: PropTypes.number,
  updatedAt: PropTypes.string,
};
