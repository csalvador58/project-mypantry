import type { FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

interface PantryDataManagementProps {
  deleteHandler: (itemId: string) => void;
  itemId: string;
}

export const PantryDataManagement: FC<PantryDataManagementProps> = (props) => {
  const { deleteHandler, itemId, ...other } = props;

  const handleDelete = () => {
    deleteHandler(itemId);
  };
  return (
    <Card {...other}>
      <CardHeader title='Item Management' />
      <CardContent sx={{ pt: 0 }}>
        <Button color='error' variant='outlined' onClick={handleDelete}>
          Delete
        </Button>
        <Box sx={{ mt: 1 }}>
          <Typography color='text.secondary' variant='body2'>
            IMPORTANT - All data for item will be permanently deleted.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

PantryDataManagement.propTypes = {
  // @ts-ignore
  deleteHandler: PropTypes.func.isRequired,
};
