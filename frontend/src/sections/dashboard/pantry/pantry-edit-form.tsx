import type { FC } from 'react';
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
import type { Pantry } from 'src/types/pantry';
import { wait } from 'src/utils/wait';

interface PantryEditFormProps {
  pantry: Pantry;
}

export const PantryEditForm: FC<PantryEditFormProps> = (props) => {
  const { pantry, ...other } = props;
  const formik = useFormik({
    initialValues: {
      price: pantry.price || '',
      location: pantry.location || '',
      note: pantry.note || '',
      favorite: pantry.favorite || false,
      name: pantry.name || '',
      quantity: pantry.quantity || '',
      submit: null
    },
    validationSchema: Yup.object({
      price: Yup.string().max(255),
      location: Yup.string().max(255),
      note: Yup
        .string()
        .max(255)
        .required('note is required'),
      favorite: Yup.bool(),
      name: Yup
        .string()
        .max(255)
        .required('Name is required'),
      quantity: Yup.string().max(15)
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        // NOTE: Make API request
        await wait(500);
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
    }
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      {...other}
    >
      <Card>
        <CardHeader title="Edit Pantry Item" />
        <CardContent sx={{ pt: 0 }}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Name"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.name}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.quantity && formik.errors.quantity)}
                fullWidth
                helperText={formik.touched.quantity && formik.errors.quantity}
                label="Quantity"
                name="quantity"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.quantity}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.location && formik.errors.location)}
                fullWidth
                helperText={formik.touched.location && formik.errors.location}
                label="Location"
                name="location"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.location}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.price && formik.errors.price)}
                fullWidth
                helperText={formik.touched.price && formik.errors.price}
                label="Price Tracker"
                name="price"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.price}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.note && formik.errors.note)}
                fullWidth
                helperText={formik.touched.note && formik.errors.note}
                label="Note"
                name="note"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.note}
              />
            </Grid>
          </Grid>
          <Stack
            divider={<Divider />}
            spacing={3}
            sx={{ mt: 3 }}
          >
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                >
                  Favorite
                </Typography>
              </Stack>
              <Switch
                checked={formik.values.favorite}
                color="primary"
                edge="start"
                name="favorite"
                onChange={formik.handleChange}
                value={formik.values.favorite}
              />
            </Stack>
          </Stack>
        </CardContent>
        <Stack
          direction={{
            xs: 'column',
            sm: 'row'
          }}
          flexWrap="wrap"
          spacing={3}
          sx={{ p: 3 }}
        >
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            variant="contained"
          >
            Update
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            disabled={formik.isSubmitting}
            href={paths.myPantry.details}
          >
            Cancel
          </Button>
        </Stack>
      </Card>
    </form>
  );
};

PantryEditForm.propTypes = {
  // @ts-ignore
  pantry: PropTypes.object.isRequired
};
