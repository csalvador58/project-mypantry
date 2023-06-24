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

import { customersApi } from 'src/api/customers';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { paths } from 'src/paths';
import { CustomerBasicDetails } from 'src/sections/dashboard/customer/customer-basic-details';
import { CustomerDataManagement } from 'src/sections/dashboard/customer/customer-data-management';
import { CustomerEmailsSummary } from 'src/sections/dashboard/customer/customer-emails-summary';
import { CustomerPayment } from 'src/sections/dashboard/customer/customer-payment';
import type { Customer } from 'src/types/customer';
import { getInitials } from 'src/utils/get-initials';

const tabs = [
  { label: 'Details', value: 'details' },
];

const useCustomer = (): Customer | null => {
  const isMounted = useMounted();
  const [customer, setCustomer] = useState<Customer | null>(null);

  const handleCustomerGet = useCallback(async () => {
    try {
      const response = await customersApi.getCustomer();

      if (isMounted()) {
        setCustomer(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      handleCustomerGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return customer;
};

const Page = () => {
  const [currentTab, setCurrentTab] = useState<string>('details');
  const customer = useCustomer();

  usePageView();

  const handleTabsChange = useCallback(
    (event: ChangeEvent<any>, value: string): void => {
      setCurrentTab(value);
    },
    []
  );

  if (!customer) {
    return null;
  }

  const data = {
    'Pantry 1': customer.inPantry1 || false,
    'Pantry 2': customer.inPantry2 || false,
    'Pantry 3': customer.inPantry3 || false,
    'Freezer': customer.freezer || false,
    'Other': customer.other || false,
  };
  const locationString: string[] = [];
  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      locationString.push(key);
    }
  });
  const location = locationString.join(', ');

  const time = customer.updatedAt? new Date(customer.updatedAt).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZoneName: 'short',
  }) : '';

  

  return (
    <>
      <Seo title="Dashboard: Customer Details" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack spacing={4}>
              <div>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.customers.index}
                  sx={{
                    alignItems: 'center',
                    display: 'inline-flex'
                  }}
                  underline="hover"
                >
                  <SvgIcon sx={{ mr: 1 }}>
                    <ArrowLeftIcon />
                  </SvgIcon>
                  <Typography variant="subtitle2">
                    Pantry
                  </Typography>
                </Link>
              </div>
              <Stack
                alignItems="flex-start"
                direction={{
                  xs: 'column',
                  md: 'row'
                }}
                justifyContent="space-between"
                spacing={4}
              >
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                >
                  <Stack spacing={1}>
                    <Typography variant="h4">
                      {customer.name}
                    </Typography>
                    <Stack
                      alignItems="center"
                      direction="row"
                      spacing={1}
                    >
                      <Typography variant="subtitle2">
                        item_id:
                      </Typography>
                      <Chip
                        label={customer.id}
                        size="small"
                      />
                    </Stack>
                  </Stack>
                </Stack>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                >
                  <Button
                    color="inherit"
                    component={RouterLink}
                    endIcon={(
                      <SvgIcon>
                        <Edit02Icon />
                      </SvgIcon>
                    )}
                    href={paths.customers.edit}
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
                  indicatorColor="primary"
                  onChange={handleTabsChange}
                  scrollButtons="auto"
                  sx={{ mt: 3 }}
                  textColor="primary"
                  value={currentTab}
                  variant="scrollable"
                >
                  {tabs.map((tab) => (
                    <Tab
                      key={tab.value}
                      label={tab.label}
                      value={tab.value}
                    />
                  ))}
                </Tabs>
                <Divider />
              </div>
            </Stack>
            {currentTab === 'details' && (
              <div>
                <Grid
                  container
                  spacing={4}
                >
                  <Grid
                    xs={12}
                    lg={4}
                  >
                    <CustomerBasicDetails
                      location={location}
                      note={customer.note}
                      quantity={customer.totalOrders}
                      price={customer.totalSpent}
                      lastUpdated={time}
                    />
                  </Grid>
                  <Grid
                    xs={12}
                    lg={8}
                  >
                    <Stack spacing={4}>
                      <CustomerDataManagement />
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
