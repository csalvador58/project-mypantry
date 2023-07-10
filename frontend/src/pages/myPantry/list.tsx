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

import { myPantryApi } from 'src/api/myPantry';
import { Seo } from 'src/components/seo';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { useSelection } from 'src/hooks/use-selection';
import { PantryListSearch } from 'src/sections/dashboard/pantry/pantry-list-search';
import { PantryListTable } from 'src/sections/dashboard/pantry/pantry-list-table';
import type { Pantry } from 'src/types/pantry';
import { paths } from 'src/paths';
import { RouterLink } from 'src/components/router-link';
import { ErrorLogger } from 'src/error/error-logger';
import ErrorHandler from 'src/error/error-handler';
import { useAuth } from 'src/hooks/use-auth';
import { useRouter } from 'src/hooks/use-router';
import toast from 'react-hot-toast';

interface Filters {
  query?: string;
  location1?: boolean;
  location2?: boolean;
  location3?: boolean;
  location4?: boolean;
  location5?: boolean;
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
      location1: undefined,
      location2: undefined,
      location3: undefined,
      location4: undefined,
      location5: undefined,
    },
    page: 0,
    rowsPerPage: 5,
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

interface MyPantryStoreState {
  myPantry: Pantry[];
  myPantryCount: number;
}

const useThrowAsyncError = () => {
  const [state, setState] = useState();

  return (error: any) => {
    setState(() => {
      throw error;
    });
  };
};

const useMyPantryStore = (searchState: MyPantrySearchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState<MyPantryStoreState>({
    myPantry: [],
    myPantryCount: 0,
  });
  const throwAsyncError = useThrowAsyncError();
  const authContext = useAuth();
  const router = useRouter();

  const handleMyPantryGet = useCallback(async () => {
    try {
      const response = await myPantryApi.getMyPantry(searchState);

      if (isMounted()) {
        setState({
          myPantry: response.data,
          myPantryCount: response.count,
        });
      }
    } catch (err) {
      if (isMounted()) {
        setState({
          myPantry: [],
          myPantryCount: 0,
        });
      }

      if (err.message.includes('jwt expired')) {
        toast.error('Login token expired, please re-login.');
        ErrorLogger(err)
        console.log('signout!');
        authContext.signOut();
        router.replace(paths.auth.jwt.login)
      }

      throwAsyncError(err);
    }
  }, [searchState, isMounted]);

  useEffect(
    () => {
      handleMyPantryGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchState]
  );

  return {
    ...state,
  };
};

const useMyPantryIds = (myPantry: Pantry[] = []) => {
  return useMemo(() => {
    return myPantry.map((pantry) => pantry.id);
  }, [myPantry]);
};

const Page = () => {
  const myPantrySearch = useMyPantrySearch();
  const myPantryStore = useMyPantryStore(myPantrySearch.state);
  const myPantryIds = useMyPantryIds(myPantryStore.myPantry);
  const myPantrySelection = useSelection<string>(myPantryIds);

  usePageView();

  return (
    <>
      <Seo title='Dashboard: Pantry List' />
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
                <Typography variant='h4'>Pantry</Typography>
              </Stack>
              <Stack alignItems='center' direction='row' spacing={3}>
                <Button
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant='contained'
                  component={RouterLink}
                  href={paths.myPantry.add}
                >
                  Add To Pantry
                </Button>
              </Stack>
            </Stack>
            <Card>
              <PantryListSearch
                onFiltersChange={myPantrySearch.handleFiltersChange}
                onSortChange={myPantrySearch.handleSortChange}
                sortBy={myPantrySearch.state.sortBy}
                sortDir={myPantrySearch.state.sortDir}
              />
              <PantryListTable
                count={myPantryStore.myPantryCount}
                items={myPantryStore.myPantry}
                onDeselectAll={myPantrySelection.handleDeselectAll}
                onDeselectOne={myPantrySelection.handleDeselectOne}
                onPageChange={myPantrySearch.handlePageChange}
                onRowsPerPageChange={myPantrySearch.handleRowsPerPageChange}
                onSelectAll={myPantrySelection.handleSelectAll}
                onSelectOne={myPantrySelection.handleSelectOne}
                page={myPantrySearch.state.page}
                rowsPerPage={myPantrySearch.state.rowsPerPage}
                selected={myPantrySelection.selected}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
