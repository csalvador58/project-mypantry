import { type FC } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import type { PantryAdd } from 'src/types/pantry';

import { myPantryApi } from 'src/api/myPantry';

// interface PantryAddFormProps {
//   pantry: Pantry;
// }

// export const PantryAddForm: FC<PantryAddFormProps> = () => {
export const PantryAddForm: FC = () => {
  // const { pantry, ...other } = props;
  const formik = useFormik({
    initialValues: {
      price: null,
      note: '',
      location1: false,
      location2: false,
      location3: false,
      location4: false,
      location5: false,
      favorite: false,
      name: '',
      quantity: null,
      submit: null,
    },
    validationSchema: Yup.object({
      price: Yup.number().positive('Price must be greater than 0'),
      note: Yup.string().min(2).max(255),
      location1: Yup.bool(),
      location2: Yup.bool(),
      location3: Yup.bool(),
      location4: Yup.bool(),
      location5: Yup.bool(),
      favorite: Yup.bool(),
      name: Yup.string().max(255).required('Name is required'),
      quantity: Yup.number().positive('Quantity must be greater than 0'),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        // NOTE: Make API request
        const response = await myPantryApi.addPantryItem({
          // id: pantry.id,
          favorite: values.favorite,
          location1: values.location1,
          location2: values.location2,
          location3: values.location3,
          location4: values.location4,
          location5: values.location5,
          name: values.name,
          note: values.note,
          price: values.price ? +values.price : null,
          quantity: values.quantity? +values.quantity : null,
        } as PantryAdd);
        
        if(response) {
          alert('Pantry Item Added!')
        } else {
          alert('Error encountered during update, item may be corrupted.')
        }
        // await wait(500);
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success('Pantry updated');
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    // <form onSubmit={formik.handleSubmit} {...other}>
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader title={`Fill out form then click Add To Pantry:`} />
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label='Name'
                name='name'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.name}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.quantity && formik.errors.quantity)}
                fullWidth
                helperText={formik.touched.quantity && formik.errors.quantity}
                label='Quantity'
                name='quantity'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.quantity ? formik.values.quantity : ''}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.price && formik.errors.price)}
                fullWidth
                helperText={formik.touched.price && formik.errors.price}
                label='Price Tracker'
                name='price'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.price ? formik.values.price : ''}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                error={!!(formik.touched.note && formik.errors.note)}
                fullWidth
                helperText={formik.touched.note && formik.errors.note}
                label='Note'
                name='note'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.note}
              />
            </Grid>
          </Grid>
          <Stack divider={<Divider />} spacing={3} sx={{ mt: 3 }}>
            <Stack alignItems='center' direction='row' spacing={3}>
              <Stack spacing={1}>
                <Typography gutterBottom variant='subtitle1'>
                  Pantry 1
                </Typography>
              </Stack>
              <Switch
                checked={formik.values.location1}
                color='primary'
                edge='start'
                name='location1'
                onChange={formik.handleChange}
                value={formik.values.location1}
              />
              <Stack spacing={1}>
                <Typography gutterBottom variant='subtitle1'>
                  Pantry 2
                </Typography>
              </Stack>
              <Switch
                checked={formik.values.location2}
                color='primary'
                edge='start'
                name='location2'
                onChange={formik.handleChange}
                value={formik.values.location2}
              />
              <Stack spacing={1}>
                <Typography gutterBottom variant='subtitle1'>
                  Pantry 3
                </Typography>
              </Stack>
              <Switch
                checked={formik.values.location3}
                color='primary'
                edge='start'
                name='location3'
                onChange={formik.handleChange}
                value={formik.values.location3}
              />
              <Stack spacing={1}>
                <Typography gutterBottom variant='subtitle1'>
                  Freezer
                </Typography>
              </Stack>
              <Switch
                checked={formik.values.location4}
                color='primary'
                edge='start'
                name='location4'
                onChange={formik.handleChange}
                value={formik.values.location4}
              />
              <Stack spacing={1}>
                <Typography gutterBottom variant='subtitle1'>
                  Other
                </Typography>
              </Stack>
              <Switch
                checked={formik.values.location5}
                color='primary'
                edge='start'
                name='location5'
                onChange={formik.handleChange}
                value={formik.values.location5}
              />
            </Stack>
          </Stack>
          <Stack divider={<Divider />} spacing={3} sx={{ mt: 3 }}>
            <Stack alignItems='center' direction='row' spacing={3}>
              <Stack spacing={1}>
                <Typography gutterBottom variant='subtitle1'>
                  Favorite
                </Typography>
              </Stack>
              <Switch
                checked={formik.values.favorite}
                color='primary'
                edge='start'
                name='favorite'
                onChange={formik.handleChange}
                value={formik.values.favorite}
              />
            </Stack>
          </Stack>
        </CardContent>
        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          flexWrap='wrap'
          spacing={3}
          sx={{ p: 3 }}
        >
          <Button
            disabled={formik.isSubmitting}
            type='submit'
            variant='contained'
          >
            Add To Pantry
          </Button>
          <Button
            color='inherit'
            component={RouterLink}
            disabled={formik.isSubmitting}
            href={paths.myPantry.index}
          >
            Cancel
          </Button>
        </Stack>
      </Card>
    </form>
  );
};

// PantryAddForm.propTypes = {
//   // @ts-ignore
//   pantry: PropTypes.object.isRequired,
// };
