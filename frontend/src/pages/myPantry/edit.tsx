import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
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
import { PantryEditForm } from 'src/sections/pantry/pantry-edit-form';
import type { Pantry } from 'src/types/pantry';
import { useParams } from 'react-router-dom';
import ErrorHandler from 'src/error/error-handler';
import { useAuth } from 'src/hooks/use-auth';
import { useRouter } from 'src/hooks/use-router';
import { ErrorLogger } from 'src/error/error-logger';
import toast from 'react-hot-toast';

const useThrowAsyncError = () => {
  const [state, setState] = useState();

  return (error: any) => {
    setState(() => {
      throw error;
    });
  };
};

const usePantry = (): Pantry | null => {
  const isMounted = useMounted();
  const [pantry, setPantry] = useState<Pantry | null>(null);
  const { pantryId } = useParams();
  const throwAsyncError = useThrowAsyncError();
  const authContext = useAuth();
  const router = useRouter();

  const handlePantryGet = useCallback(async () => {
    try {
      const request = { id: pantryId ? pantryId : '' };
      const response = await myPantryApi.getPantryItem(request);

      if (isMounted()) {
        setPantry(response);
      }
    } catch (err) {
      if (isMounted()) {
        setPantry(null);
      }
      if (err.message.includes('jwt expired')) {
        toast.error('Login token expired, please re-login.',{
          duration: 3000,
          position: 'top-center',
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        });
        ErrorLogger(err)
        authContext.signOut();
        router.replace(paths.auth.jwt.login)
      }

      throwAsyncError(err);
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
      <Seo title='Dashboard: Edit Item' />
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
