import type { ChangeEvent, MouseEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Download01Icon from '@untitled-ui/icons-react/build/esm/Download01';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Upload01Icon from '@untitled-ui/icons-react/build/esm/Upload01';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { customersApi } from 'src/api/customers';
import { Seo } from 'src/components/seo';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { useSelection } from 'src/hooks/use-selection';
import { PantryListSearch } from 'src/sections/dashboard/pantry/pantry-list-search';
import { PantryListTable } from 'src/sections/dashboard/pantry/pantry-list-table';
import type { Pantry } from 'src/types/customer';

interface Filters {
  query?: string;
  inPantry1?: boolean;
  inPantry2?: boolean;
  inPantry3?: boolean;
  freezer?: boolean;
  other?: boolean;
}

interface MyPantrySearchState {
  filters: Filters;
  page: number;
  rowsPerPage: number;
  sortBy: string;
  sortDir: 'asc' | 'desc';
}

const useMyPantrySearch = () => {
  const [state, setState] = useState<MyPantrySearchState>({
    filters: {
      query: undefined,
      inPantry1: undefined,
      inPantry2: undefined,
      inPantry3: undefined,
      freezer: undefined,
      other: undefined
    },
    page: 0,
    rowsPerPage: 5,
    sortBy: 'updatedAt',
    sortDir: 'desc'
  });

  const handleFiltersChange = useCallback(
    (filters: Filters): void => {
      setState((prevState) => ({
        ...prevState,
        filters
      }));
    },
    []
  );

  const handleSortChange = useCallback(
    (sort: { sortBy: string; sortDir: 'asc' | 'desc'; }): void => {
      setState((prevState) => ({
        ...prevState,
        sortBy: sort.sortBy,
        sortDir: sort.sortDir
      }));
    },
    []
  );

  const handlePageChange = useCallback(
    (event: MouseEvent<HTMLButtonElement> | null, page: number): void => {
      setState((prevState) => ({
        ...prevState,
        page
      }));
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setState((prevState) => ({
        ...prevState,
        rowsPerPage: parseInt(event.target.value, 10)
      }));
    },
    []
  );

  return {
    handleFiltersChange,
    handleSortChange,
    handlePageChange,
    handleRowsPerPageChange,
    state
  };
};

interface MyPantryStoreState {
  customers: Pantry[];
  customersCount: number;
}

const useMyPantryStore = (searchState: MyPantrySearchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState<MyPantryStoreState>({
    customers: [],
    customersCount: 0
  });

  const handleMyPantryGet = useCallback(
    async () => {
      try {
        const response = await customersApi.getMyPantry(searchState);

        if (isMounted()) {
          setState({
            customers: response.data,
            customersCount: response.count
          });
        }
      } catch (err) {
        console.error(err);
      }
    },
    [searchState, isMounted]
  );

  useEffect(
    () => {
      handleMyPantryGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchState]
  );

  return {
    ...state
  };
};

const useMyPantryIds = (customers: Pantry[] = []) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
    },
    [customers]
  );
};

const Page = () => {
  const customersSearch = useMyPantrySearch();
  const customersStore = useMyPantryStore(customersSearch.state);
  const customersIds = useMyPantryIds(customersStore.customers);
  const customersSelection = useSelection<string>(customersIds);

  usePageView();

  return (
    <>
      <Seo title="Dashboard: Pantry List" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Pantry
                </Typography>
              </Stack>
              <Stack
                alignItems="center"
                direction="row"
                spacing={3}
              >
                <Button
                  startIcon={(
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button>
              </Stack>
            </Stack>
            <Card>
              <PantryListSearch
                onFiltersChange={customersSearch.handleFiltersChange}
                onSortChange={customersSearch.handleSortChange}
                sortBy={customersSearch.state.sortBy}
                sortDir={customersSearch.state.sortDir}
              />
              <PantryListTable
                count={customersStore.customersCount}
                items={customersStore.customers}
                onDeselectAll={customersSelection.handleDeselectAll}
                onDeselectOne={customersSelection.handleDeselectOne}
                onPageChange={customersSearch.handlePageChange}
                onRowsPerPageChange={customersSearch.handleRowsPerPageChange}
                onSelectAll={customersSelection.handleSelectAll}
                onSelectOne={customersSelection.handleSelectOne}
                page={customersSearch.state.page}
                rowsPerPage={customersSearch.state.rowsPerPage}
                selected={customersSelection.selected}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
