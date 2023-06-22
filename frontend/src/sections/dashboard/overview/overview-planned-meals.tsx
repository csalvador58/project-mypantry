import type { FC } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import CalendarIcon from '@untitled-ui/icons-react/build/esm/Calendar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

type Event = {
  id: string;
  createdAt: Date;
  description: string;
  title: string;
}

interface OverviewPlannedMealsProps {
  meals: Event[];
}

export const OverviewPlannedMeals: FC<OverviewPlannedMealsProps> = (props) => {
  const { meals } = props;

  return (
    <Card>
      <CardHeader
        title="Upcoming Meals"
        subheader="Click to update!"
      />
      <CardContent sx={{ pt: 0 }}>
        <List disablePadding>
          {meals.map((meal) => {
            const createdAtMonth = format(meal.createdAt, 'LLL').toUpperCase();
            const createdAtDay = format(meal.createdAt, 'd');

            return (
              <ListItem
                disableGutters
                sx={{ py: 1.5 }}
                key={meal.id}
              >
                <ListItemAvatar>
                  <Box
                    sx={{
                      p: 1,
                      backgroundColor: (theme) => theme.palette.mode === 'dark'
                        ? 'neutral.800'
                        : 'neutral.100',
                      borderRadius: 2,
                      maxWidth: 'fit-content'
                    }}
                  >
                    <Typography
                      align="center"
                      color="text.primary"
                      variant="caption"
                    >
                      {createdAtMonth}
                    </Typography>
                    <Typography
                      align="center"
                      color="text.primary"
                      variant="h6"
                    >
                      {createdAtDay}
                    </Typography>
                  </Box>
                </ListItemAvatar>
                <ListItemText>
                  <Typography variant="subtitle2">
                    {meal.title}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                  >
                    {meal.description}
                  </Typography>
                </ListItemText>
                <ListItemSecondaryAction>
                  <IconButton color="inherit">
                    <SvgIcon fontSize="small">
                      <CalendarIcon />
                    </SvgIcon>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon>
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
        >
          See all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewPlannedMeals.propTypes = {
  meals: PropTypes.array.isRequired
};
