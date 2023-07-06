import { useCallback, useEffect, useState } from 'react';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { myPantryApi } from 'src/api/myPantry';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { paths } from 'src/paths';
import { PantryEditForm } from 'src/sections/dashboard/pantry/pantry-edit-form';
import type { Pantry } from 'src/types/pantry';
import { useParams } from 'react-router-dom';

const usePantry = (): Pantry | null => {
  const isMounted = useMounted();
  const [pantry, setPantry] = useState<Pantry | null>(null);
  const { pantryId } = useParams();

  const handlePantryGet = useCallback(async () => {
    try {
      const request = {id: pantryId ? pantryId : ''}
      const response = await myPantryApi.getPantryItem(request);

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
  const pantry = usePantry();

  usePageView();

  if (!pantry) {
    return null;
  }

  return (
    <>
      <Seo title='Dashboard: Item Edit' />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth='lg'>
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
                      <Typography variant='subtitle2'>user_id:</Typography>
                      <Chip label={pantry.id} size='small' />
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <PantryEditForm pantry={pantry} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
