import type { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { salesApi } from 'src/api/sales';
import { Seo } from 'src/components/seo';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { useSelection } from 'src/hooks/use-selection';
import { SalesListSearch } from 'src/sections/sales/sales-list-search';
import { SalesListTable } from 'src/sections/sales/sales-list-table';
import type { Pantry } from 'src/types/pantry';
import { paths } from 'src/paths';
import { RouterLink } from 'src/components/router-link';
import { ErrorLogger } from 'src/error/error-logger';
import ErrorHandler from 'src/error/error-handler';
import { useAuth } from 'src/hooks/use-auth';
import { useRouter } from 'src/hooks/use-router';
import toast from 'react-hot-toast';
import { Sales } from 'src/types/sales';
import { myPantryApi } from 'src/api/myPantry';

interface Filters {
  query?: string;
  location1?: boolean;
  location2?: boolean;
  location3?: boolean;
  location4?: boolean;
  location5?: boolean;
}

interface SalesSearchState {
  filters: Filters;
  page: number;
  rowsPerPage: number;
  sortBy: string;
  sortDir: 'asc' | 'desc';
}

const useSalesSearch = () => {
  const [state, setState] = useState<SalesSearchState>({
    filters: {
      query: undefined,
      location1: undefined,
      location2: undefined,
      location3: undefined,
      location4: undefined,
      location5: undefined,
    },
    page: 0,
    rowsPerPage: 10,
    sortBy: 'updatedAt',
    sortDir: 'desc',
  });

  const handleFiltersChange = useCallback((filters: Filters): void => {
    setState((prevState) => ({
      ...prevState,
      filters,
    }));
  }, []);

  const handleSortChange = useCallback(
    (sort: { sortBy: string; sortDir: 'asc' | 'desc' }): void => {
      setState((prevState) => ({
        ...prevState,
        sortBy: sort.sortBy,
        sortDir: sort.sortDir,
      }));
    },
    []
  );

  const handlePageChange = useCallback(
    (event: MouseEvent<HTMLButtonElement> | null, page: number): void => {
      setState((prevState) => ({
        ...prevState,
        page,
      }));
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setState((prevState) => ({
        ...prevState,
        rowsPerPage: parseInt(event.target.value, 10),
      }));
    },
    []
  );

  return {
    handleFiltersChange,
    handleSortChange,
    handlePageChange,
    handleRowsPerPageChange,
    state,
  };
};

interface SalesStoreState {
  sales: Sales[];
  salesCount: number;
}

const useThrowAsyncError = () => {
  const [state, setState] = useState();

  return (error: any) => {
    setState(() => {
      throw error;
    });
  };
};

const useSalesStore = (searchState: SalesSearchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState<SalesStoreState>({
    sales: [],
    salesCount: 0,
  });
  const throwAsyncError = useThrowAsyncError();
  const authContext = useAuth();
  const router = useRouter();

  const handleSalesGet = useCallback(async () => {
    try {
      const response = await salesApi.getSalesFromDB(searchState);

      if (isMounted()) {
        setState({
          sales: response.data,
          salesCount: response.count,
        });
      }
    } catch (err) {
      if (isMounted()) {
        setState({
          sales: [],
          salesCount: 0,
        });
      }

      if (err.message.includes('jwt expired')) {
        toast.error('Login token expired, please re-login.');
        ErrorLogger(err);
        authContext.signOut();
        router.replace(paths.auth.jwt.login);
      }

      throwAsyncError(err);
    }
  }, [searchState, isMounted]);

  useEffect(
    () => {
      handleSalesGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchState]
  );

  return {
    ...state,
  };
};

const useSaleItemIds = (sales: Sales[] = []) => {
  return useMemo(() => {
    return sales.map((item) => item.id);
  }, [sales]);
};

const Page = () => {
  const salesSearch = useSalesSearch();
  const salesStore = useSalesStore(salesSearch.state);
  const salesIds = useSaleItemIds(salesStore.sales);
  const salesSelection = useSelection<string>(salesIds);
  const throwAsyncError = useThrowAsyncError();
  const authContext = useAuth();
  const router = useRouter();

  usePageView();

  const refreshSalesHandler = async () => {
    try {
      await salesApi.updateSalesData();

    } catch (err) {
      if (err.message.includes('jwt expired')) {
        toast.error('Login token expired, please re-login.');
        ErrorLogger(err);
        authContext.signOut();
        router.replace(paths.auth.jwt.login);
      }

      throwAsyncError(err);
    }
  };

  return (
    <>
      <Seo title='Dashboard: Current Sales' />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth='xl'>
          <Stack spacing={4}>
            <Stack direction='row' justifyContent='space-between' spacing={4}>
              <Stack spacing={1}>
                <Typography variant='h4'>Current Sales</Typography>
              </Stack>
              <Stack alignItems='center' direction='row' spacing={3}>
                <Button
                  variant='contained'
                  //   component={RouterLink}
                  //   href={paths.myPantry.add}
                  onClick={refreshSalesHandler}
                >
                  Refresh Sales
                </Button>
              </Stack>
            </Stack>
            <Card>
              <SalesListSearch
                onFiltersChange={salesSearch.handleFiltersChange}
                onSortChange={salesSearch.handleSortChange}
                sortBy={salesSearch.state.sortBy}
                sortDir={salesSearch.state.sortDir}
              />
              <SalesListTable
                count={salesStore.salesCount}
                items={salesStore.sales}
                onDeselectAll={salesSelection.handleDeselectAll}
                onDeselectOne={salesSelection.handleDeselectOne}
                onPageChange={salesSearch.handlePageChange}
                onRowsPerPageChange={salesSearch.handleRowsPerPageChange}
                onSelectAll={salesSelection.handleSelectAll}
                onSelectOne={salesSelection.handleSelectOne}
                page={salesSearch.state.page}
                rowsPerPage={salesSearch.state.rowsPerPage}
                selected={salesSelection.selected}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
