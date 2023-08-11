import * as Yup from 'yup';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
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
import { useState } from 'react';
import toast from 'react-hot-toast';
import { ErrorLogger } from 'src/error/error-logger';

interface Values {
  username: string;
  password: string;
  policy: boolean;
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

const initialValues: Values = {
  username: '',
  password: '',
  policy: false,
  submit: null,
};

const validationSchema = Yup.object({
  username: Yup.string().max(255).required('Username is required'),
  password: Yup.string().min(7).max(255).required('Password is required'),
  policy: Yup.boolean().oneOf([true], 'This field must be checked'),
});

const Page = () => {
  const isMounted = useMounted();
  const router = useRouter();
  const searchParams = useSearchParams();
  const authContext = useAuth();
  const throwAsyncError = useThrowAsyncError();
  const returnTo = searchParams.get('returnTo');
  const { issuer, signUp } = useAuth<AuthContextType>();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers): Promise<void> => {

      try {
        const response = await signUp(values.username, values.password);

        if (response) {
          helpers.setStatus({ success: true });
          helpers.setSubmitting(false);
          toast.success('Username successfully registered!', {
            duration: 3000,
            position: 'top-center',
            ariaProps: {
              role: 'status',
              'aria-live': 'polite',
            },
          });
          if (isMounted()) {
            router.push(returnTo || paths.index);
          }
        } else {
          toast.error(
            'Error encountered during registering, please refresh page and try again.', {
              duration: 3000,
              position: 'top-center',
              ariaProps: {
                role: 'status',
                'aria-live': 'polite',
              },
            }
          );
          helpers.setStatus({ success: false });
          helpers.setSubmitting(false);
          authContext.signOut();
          router.replace(paths.auth.jwt.register);
        }
      } catch (err) {
        if (isMounted()) {
          if (
            err.message.includes('Invalid username')
          ) {
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: 'Username must be more than 2 letters, try again!' });
            helpers.setSubmitting(false);
            return;
          }

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
      <Seo title='Register' />
      <div>
        <Card elevation={16}>
          <CardHeader
            subheader={
              <Typography color='text.secondary' variant='body2'>
                Already have an account? &nbsp;
                <Link
                  component={RouterLink}
                  href={paths.auth.jwt.login}
                  underline='hover'
                  variant='subtitle2'
                >
                  Log in
                </Link>
              </Typography>
            }
            sx={{ pb: 0 }}
            title='Register'
          />
          <CardContent>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
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
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  ml: -1,
                  mt: 1,
                }}
              >
                <Checkbox
                  checked={formik.values.policy}
                  name='policy'
                  onChange={formik.handleChange}
                />
                <Typography color='text.secondary' variant='body2'>
                  I have read the{' '}
                  <Link component='a' href='#'>
                    Terms and Conditions
                  </Link>
                </Typography>
              </Box>
              {!!(formik.touched.policy && formik.errors.policy) && (
                <FormHelperText error>{formik.errors.policy}</FormHelperText>
              )}
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
                Register
              </Button>
            </form>
          </CardContent>
        </Card>
        <Box sx={{ mt: 3 }}>
          <AuthIssuer issuer={issuer} />
        </Box>
      </div>
    </>
  );
};

export default Page;
