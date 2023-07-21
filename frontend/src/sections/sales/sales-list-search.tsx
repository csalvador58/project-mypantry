import type { FC } from 'react';
import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';

import { useUpdateEffect } from 'src/hooks/use-update-effect';

interface Filters {
  query?: string;
  location1?: boolean;
  location2?: boolean;
  location3?: boolean;
  location4?: boolean;
  location5?: boolean;
}

type TabValue = 'all' | 'location1' | 'location2' | 'location3' | 'location4' | 'location5';

interface TabOption {
  label: string;
  value: TabValue;
}

const tabs: TabOption[] = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Central Market',
    value: 'location1'
  }
];

type SortValue = 'endDate|desc' | 'endDate|asc' | 'salePrice|desc' | 'salePrice|asc';

interface SortOption {
  label: string;
  value: SortValue;
}

const sortOptions: SortOption[] = [
  {
    label: 'Sale Ends (newest)',
    value: 'endDate|desc'
  },
  {
    label: 'Sale Ends (oldest)',
    value: 'endDate|asc'
  },
  {
    label: 'Sale Price (highest)',
    value: 'salePrice|desc'
  },
  {
    label: 'Sale Price (lowest)',
    value: 'salePrice|asc'
  }
];

type SortDir = 'asc' | 'desc';

interface SalesListSearchProps {
  onFiltersChange?: (filters: Filters) => void;
  onSortChange?: (sort: { sortBy: string; sortDir: SortDir }) => void;
  sortBy?: string;
  sortDir?: SortDir;
  triggerRefresh: boolean;
}

export const SalesListSearch: FC<SalesListSearchProps> = (props) => {
  const { onFiltersChange, onSortChange, sortBy, sortDir, triggerRefresh } = props;
  const queryRef = useRef<HTMLInputElement | null>(null);
  const [currentTab, setCurrentTab] = useState<TabValue>('all');
  const [filters, setFilters] = useState<Filters>({});

  const handleFiltersUpdate = useCallback(
    () => {
      onFiltersChange?.(filters);
    },
    [filters, onFiltersChange]
  );

  useUpdateEffect(
    () => {
      handleFiltersUpdate();
    },
    [filters, handleFiltersUpdate]
  );

  const handleTabsChange = useCallback(
    (event: ChangeEvent<any>, value: TabValue): void => {
    
      setCurrentTab(value);
      setFilters((prevState) => {
        const updatedFilters: Filters = {
          ...prevState,
          location1: undefined,
          location2: undefined,
          location3: undefined,
          location4: undefined,
          location5: undefined
        };

        if (value !== 'all') {
          updatedFilters[value] = true;
        }
        return updatedFilters;
      });
    },
    []
  );

  const handleQueryChange = useCallback(
    (event: FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      setFilters((prevState) => ({
        ...prevState,
        query: queryRef.current?.value
      }));
    },
    []
  );

  const handleSortChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const [sortBy, sortDir] = event.target.value.split('|') as [string, SortDir];

      onSortChange?.({
        sortBy,
        sortDir
      });
    },
    [onSortChange]
  );

  useEffect(() => {
    setCurrentTab('all');
    setFilters((prevState) => {
      const updatedFilters: Filters = {
        ...prevState,
        location1: undefined,
        location2: undefined,
        location3: undefined,
        location4: undefined,
        location5: undefined,
      };
      return updatedFilters;
    });
  }, [triggerRefresh]);

  return (
    <>
      <Tabs
        indicatorColor="primary"
        onChange={handleTabsChange}
        scrollButtons="auto"
        sx={{ px: 3 }}
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
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        spacing={3}
        sx={{ p: 3 }}
      >
        <Box
          component="form"
          onChange={handleQueryChange}
          sx={{ flexGrow: 1 }}
        >
          <OutlinedInput
            defaultValue=""
            fullWidth
            inputProps={{ ref: queryRef }}
            placeholder="Search mySales"
            startAdornment={(
              <InputAdornment position="start">
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            )}
          />
        </Box>
        <TextField
          label="Sort By"
          name="sort"
          onChange={handleSortChange}
          select
          SelectProps={{ native: true }}
          value={`${sortBy}|${sortDir}`}
        >
          {sortOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </TextField>
      </Stack>
    </>
  );
};

SalesListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
  onSortChange: PropTypes.func,
  sortBy: PropTypes.string,
  sortDir: PropTypes.oneOf<SortDir>(['asc', 'desc']),
  triggerRefresh: PropTypes.bool.isRequired,
};
