import type { FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

export const CustomerDataManagement: FC = (props) => (
  <Card {...props}>
    <CardHeader title="Item Management" />
    <CardContent sx={{ pt: 0 }}>
      <Button
        color="error"
        variant="outlined"
      >
        Delete
      </Button>
      <Box sx={{ mt: 1 }}>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          IMPORTANT - All data for item will be permanently deleted.
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
