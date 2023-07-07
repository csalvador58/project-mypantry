import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { paths } from 'src/paths';
import { PantryAddForm } from 'src/sections/dashboard/pantry/pantry-add-form';

const Page = () => {
  usePageView();

  return (
    <>
      <Seo title='Dashboard: Add Item' />
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
                    <Typography variant='h4'>*New Item*</Typography>
                    <Stack alignItems='center' direction='row' spacing={1}>
                      <Typography variant='subtitle2'>user_id:</Typography>
                      {/* ACTION - Update below to userID when login is implemented */}
                      <Chip label={'ACTION - This will be updated userID when login is implemented'} size='small' />
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            {/* <PantryAddForm pantry={pantry} /> */}
            <PantryAddForm />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
