import { addDays } from 'date-fns';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { Seo } from 'src/components/seo';
import { useSettings } from 'src/hooks/use-settings';
import { OverviewPantryItems } from 'src/sections/dashboard/overview/overview-pantry-items';
import { OverviewPlannedMeals } from 'src/sections/dashboard/overview/overview-planned-meals';
import { OverviewToBuy } from 'src/sections/dashboard/overview/overview-to-buy';
import { OverviewDeals } from 'src/sections/dashboard/overview/overview-deals';
import { OverviewRecipeSuggestions } from 'src/sections/dashboard/overview/overview-recipe-suggestions';

import { myPantryApi } from 'src/api/myPantry';
import { useMounted } from 'src/hooks/use-mounted';
import { useCallback, useEffect, useState } from 'react';
import { PantryCount } from 'src/types/pantry';

const now = new Date();

const usePantry = (): PantryCount => {
  const isMounted = useMounted();
  const [pantryCount, setPantryCount] = useState<PantryCount>({ count: 0 });

  const handlePantryGet = useCallback(async () => {
    try {
      const response = await myPantryApi.getPantryCount();

      if (isMounted()) {
        setPantryCount(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      handlePantryGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return pantryCount;
};

const Page = () => {
  const pantry = usePantry();
  const settings = useSettings();

  return (
    <>
      <Seo title='My Pantry: Overview' />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Grid
            container
            disableEqualOverflow
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <Grid xs={12}>
              <Stack direction='row' justifyContent='space-between' spacing={4}>
                <div>
                  <Typography variant='h4'>My Pantry</Typography>
                </div>
                <div>
                  <Stack direction='row' spacing={4}>
                    <Button
                      startIcon={
                        <SvgIcon>
                          <PlusIcon />
                        </SvgIcon>
                      }
                      variant='contained'
                    >
                      Add Pantry Item
                    </Button>
                  </Stack>
                </div>
              </Stack>
            </Grid>
            <Grid xs={12} md={4}>
              <OverviewPantryItems amount={pantry.count} />
            </Grid>
            <Grid xs={12} md={4}>
              <OverviewToBuy amount={12} />
            </Grid>
            <Grid xs={12} md={4}>
              <OverviewDeals amount={5} />
            </Grid>
            <Grid xs={12} md={5}>
              <OverviewRecipeSuggestions
                sx={{ height: '100%' }}
                suggestions={[
                  {
                    title: 'Recipe 1',
                    content: 'Your favorite recipes.',
                  },
                  {
                    title: 'Recipe 2.',
                    content: 'Your favorite recipes',
                  },
                  {
                    title: 'Recipe 3.',
                    content: 'Your favorite recipes',
                  },
                ]}
              />
            </Grid>
            <Grid xs={12} md={5}>
              <OverviewPlannedMeals
                meals={[
                  {
                    id: '3bfa0bc6cbc99bf747c94d51',
                    createdAt: addDays(now, 1),
                    description: 'Dinner',
                    title: 'Carbonara',
                  },
                  {
                    id: 'dd6c8ce8655ac222b01f24f9',
                    createdAt: addDays(now, 4),
                    description: 'Lunch',
                    title: 'Pizza',
                  },
                  {
                    id: 'f274902e2bf226865b3cf947',
                    createdAt: addDays(now, 4),
                    description: 'Dinner',
                    title: 'Eat Out',
                  },
                  {
                    id: 'd2a66e24110f52acb0cd0b9f',
                    createdAt: addDays(now, 7),
                    description: 'Dinner',
                    title: 'Beef Bowl',
                  },
                ]}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Page;
