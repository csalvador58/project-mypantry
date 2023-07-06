import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import { myPantryApi } from 'src/api/myPantry';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { paths } from 'src/paths';
import { PantryBasicDetails } from 'src/sections/dashboard/pantry/pantry-basic-details';
import { PantryDataManagement } from 'src/sections/dashboard/pantry/pantry-data-management';
import type { Pantry } from 'src/types/pantry';
import { getInitials } from 'src/utils/get-initials';
import { useParams } from 'react-router-dom';

const tabs = [{ label: 'Details', value: 'details' }];

const usePantry = (): Pantry | null => {
  const isMounted = useMounted();
  const [pantry, setPantry] = useState<Pantry | null>(null);
  const { pantryId } = useParams();

  const handlePantryGet = useCallback(async () => {
    try {
      const response = await myPantryApi.getPantryItem({id: pantryId ? pantryId : ''});

      if (isMounted()) {
        setPantry(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted, pantryId]);

  useEffect(
    () => {
      handlePantryGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return pantry;
};

const Page = () => {
  const [currentTab, setCurrentTab] = useState<string>('details');
  const pantry = usePantry();

  usePageView();

  const handleTabsChange = useCallback(
    (event: ChangeEvent<any>, value: string): void => {
      setCurrentTab(value);
    },
    []
  );

  if (!pantry) {
    return null;
  }

  const data = {
    'Pantry 1': pantry.location1 || false,
    'Pantry 2': pantry.location2 || false,
    'Pantry 3': pantry.location3 || false,
    Freezer: pantry.location4 || false,
    Other: pantry.location5 || false,
  };
  const locationString: string[] = [];
  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      locationString.push(key);
    }
  });
  const location = locationString.join(', ');

  const time = pantry.updatedAt
    ? pantry.updatedAt.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZoneName: 'short',
      })
    : '';

  return (
    <>
      <Seo title='Dashboard: Pantry Details' />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth='xl'>
          <Stack spacing={4}>
            <Stack spacing={4}>
              <div>
                <Link
                  color='text.primary'
                  component={RouterLink}
                  href={paths.myPantry.index}
                  sx={{
                    alignItems: 'center',
                    display: 'inline-flex',
                  }}
                  underline='hover'
                >
                  <SvgIcon sx={{ mr: 1 }}>
                    <ArrowLeftIcon />
                  </SvgIcon>
                  <Typography variant='subtitle2'>Pantry</Typography>
                </Link>
              </div>
              <Stack
                alignItems='flex-start'
                direction={{
                  xs: 'column',
                  md: 'row',
                }}
                justifyContent='space-between'
                spacing={4}
              >
                <Stack alignItems='center' direction='row' spacing={2}>
                  <Stack spacing={1}>
                    <Typography variant='h4'>{pantry.name}</Typography>
                    <Stack alignItems='center' direction='row' spacing={1}>
                      <Typography variant='subtitle2'>item_id:</Typography>
                      <Chip label={pantry.id} size='small' />
                    </Stack>
                  </Stack>
                </Stack>
                <Stack alignItems='center' direction='row' spacing={2}>
                  <Button
                    color='inherit'
                    component={RouterLink}
                    endIcon={
                      <SvgIcon>
                        <Edit02Icon />
                      </SvgIcon>
                    }
                    // href={paths.myPantry.edit}
                    href={`/myPantry/${pantry.id}/edit`}
                  >
                    Edit
                  </Button>
                  {/* <Button
                    endIcon={(
                      <SvgIcon>
                        <ChevronDownIcon />
                      </SvgIcon>
                    )}
                    variant="contained"
                  >
                    Actions
                  </Button> */}
                </Stack>
              </Stack>
              <div>
                <Tabs
                  indicatorColor='primary'
                  onChange={handleTabsChange}
                  scrollButtons='auto'
                  sx={{ mt: 3 }}
                  textColor='primary'
                  value={currentTab}
                  variant='scrollable'
                >
                  {tabs.map((tab) => (
                    <Tab key={tab.value} label={tab.label} value={tab.value} />
                  ))}
                </Tabs>
                <Divider />
              </div>
            </Stack>
            {currentTab === 'details' && (
              <div>
                <Grid container spacing={4}>
                  <Grid xs={12} lg={4}>
                    <PantryBasicDetails
                      location={location}
                      note={pantry.note}
                      quantity={pantry.quantity}
                      price={pantry.price}
                      updatedAt={time}
                    />
                  </Grid>
                  <Grid xs={12} lg={8}>
                    <Stack spacing={4}>
                      <PantryDataManagement />
                    </Stack>
                  </Grid>
                </Grid>
              </div>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
