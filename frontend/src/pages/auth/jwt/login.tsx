import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import FormHelperText from '@mui/material/FormHelperText';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import type { AuthContextType } from 'src/contexts/auth/jwt';
import { useAuth } from 'src/hooks/use-auth';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { useRouter } from 'src/hooks/use-router';
import { useSearchParams } from 'src/hooks/use-search-params';
import { paths } from 'src/paths';
import { AuthIssuer } from 'src/sections/auth/auth-issuer';
import { MY_PANTRY } from 'src/utils/constants';
import toast from 'react-hot-toast';
import { ErrorLogger } from 'src/error/error-logger';
import { useState } from 'react';

const STORAGE_USER = MY_PANTRY.STORAGE_USER;

interface Values {
  username: string;
  password: string;
  submit: null;
}

const useThrowAsyncError = () => {
  const [state, setState] = useState();

  return (error: any) => {
    setState(() => {
      throw error;
    });
  };
};

const defaultValues: Values = {
  username: '',
  password: '',
  submit: null,
};

const validationSchema = Yup.object({
  username: Yup.string().max(255).required('Username is required'),
  password: Yup.string().max(255).required('Password is required'),
});

const Page = () => {
  const isMounted = useMounted();
  const router = useRouter();
  const authContext = useAuth();
  const throwAsyncError = useThrowAsyncError();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');
  const { issuer, signIn } = useAuth<AuthContextType>();

  const initialValues = {
    ...defaultValues,
    username: window.sessionStorage.getItem(STORAGE_USER) || '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await signIn(values.username, values.password);

        if (isMounted()) {
          router.push(returnTo || paths.index);
          // router.push(paths.myPantry.index);
        }
      } catch (err) {
        if (isMounted()) {
          toast.error('Something went wrong!', {
            duration: 3000,
            position: 'top-center',
            ariaProps: {
              role: 'status',
              'aria-live': 'polite',
            },
          });
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);

          if (err.message.includes('jwt expired')) {
            toast.error('Login token expired, please re-login.', {
              duration: 3000,
              position: 'top-center',
              ariaProps: {
                role: 'status',
                'aria-live': 'polite',
              },
            });
            ErrorLogger(err);
            authContext.signOut();
            router.replace(paths.auth.jwt.login);
          }
        }

        throwAsyncError(err);
      }
    },
  });

  usePageView();

  return (
    <>
      <Seo title='Login' />
      <div>
        <Card elevation={16}>
          <CardHeader
            subheader={
              <Typography color='text.secondary' variant='body2'>
                Don&apos;t have an account? &nbsp;
                <Link
                  component={RouterLink}
                  href={paths.auth.jwt.register}
                  underline='hover'
                  variant='subtitle2'
                >
                  Register
                </Link>
              </Typography>
            }
            sx={{ pb: 0 }}
            title='Log in'
          />
          <CardContent>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  autoFocus
                  error={!!(formik.touched.username && formik.errors.username)}
                  fullWidth
                  helperText={formik.touched.username && formik.errors.username}
                  label='Username'
                  name='username'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type='username'
                  value={formik.values.username}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label='Password'
                  name='password'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type='password'
                  value={formik.values.password}
                />
              </Stack>
              {formik.errors.submit && (
                <FormHelperText error sx={{ mt: 3 }}>
                  {formik.errors.submit as string}
                </FormHelperText>
              )}
              <Button
                disabled={formik.isSubmitting}
                fullWidth
                size='large'
                sx={{ mt: 2 }}
                type='submit'
                variant='contained'
              >
                Log In
              </Button>
            </form>
          </CardContent>
        </Card>
        <Stack spacing={3} sx={{ mt: 3 }}>
          {/* <Alert severity="error">
            <div>
              You can use <b>demoMyPantry@mypantry.io</b> and password <b>Password123!</b>
            </div>
          </Alert> */}
          <AuthIssuer issuer={issuer} />
        </Stack>
      </div>
    </>
  );
};

export default Page;
