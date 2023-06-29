import type { FC } from 'react';
import { ChangeEvent, FormEvent, useCallback, useRef, useState } from 'react';
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
  inPantry1?: boolean;
  inPantry2?: boolean;
  inPantry3?: boolean;
  freezer?: boolean;
  other?: boolean;
}

type TabValue = 'all' | 'inPantry1' | 'inPantry2' | 'inPantry3' | 'freezer' | 'other';

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
    label: 'Pantry 1',
    value: 'inPantry1'
  },
  {
    label: 'Pantry 2',
    value: 'inPantry2'
  },
  {
    label: 'Pantry 3',
    value: 'inPantry3'
  },
  {
    label: 'Freezer',
    value: 'freezer'
  },
  {
    label: 'Other',
    value: 'other'
  }
];

type SortValue = 'updatedAt|desc' | 'updatedAt|asc' | 'quantity|desc' | 'quantity|asc';

interface SortOption {
  label: string;
  value: SortValue;
}

const sortOptions: SortOption[] = [
  {
    label: 'Last update (newest)',
    value: 'updatedAt|desc'
  },
  {
    label: 'Last update (oldest)',
    value: 'updatedAt|asc'
  },
  {
    label: 'Quantity (highest)',
    value: 'quantity|desc'
  },
  {
    label: 'Quantity (lowest)',
    value: 'quantity|asc'
  }
];

type SortDir = 'asc' | 'desc';

interface PantryListSearchProps {
  onFiltersChange?: (filters: Filters) => void;
  onSortChange?: (sort: { sortBy: string; sortDir: SortDir }) => void;
  sortBy?: string;
  sortDir?: SortDir;
}

export const PantryListSearch: FC<PantryListSearchProps> = (props) => {
  const { onFiltersChange, onSortChange, sortBy, sortDir } = props;
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
      console.log('value')
      console.log(value)
    
      setCurrentTab(value);
      setFilters((prevState) => {
        const updatedFilters: Filters = {
          ...prevState,
          inPantry1: undefined,
          inPantry2: undefined,
          inPantry3: undefined,
          freezer: undefined,
          other: undefined
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
      console.log('event.target.value')
      console.log(event.target.value)
      const [sortBy, sortDir] = event.target.value.split('|') as [string, SortDir];

      onSortChange?.({
        sortBy,
        sortDir
      });
    },
    [onSortChange]
  );

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
          onSubmit={handleQueryChange}
          sx={{ flexGrow: 1 }}
        >
          <OutlinedInput
            defaultValue=""
            fullWidth
            inputProps={{ ref: queryRef }}
            placeholder="Search myPantry"
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

PantryListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
  onSortChange: PropTypes.func,
  sortBy: PropTypes.string,
  sortDir: PropTypes.oneOf<SortDir>(['asc', 'desc'])
};
