import type { ChangeEvent, FC, MouseEvent } from 'react';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
// import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/components/router-link';
import { Scrollbar } from 'src/components/scrollbar';
import { paths } from 'src/paths';
import type { Pantry } from 'src/types/pantry';

interface PantryListTableProps {
  count?: number;
  items?: Pantry[];
  onDeselectAll?: () => void;
  onDeselectOne?: (pantryId: string) => void;
  onPageChange?: (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelectAll?: () => void;
  onSelectOne?: (pantryId: string) => void;
  page?: number;
  rowsPerPage?: number;
  selected?: string[];
}

export const PantryListTable: FC<PantryListTableProps> = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;
  const enableBulkActions = selected.length > 0;

  return (
    <Box sx={{ position: 'relative' }}>
      {enableBulkActions && (
        <Stack
          direction='row'
          spacing={2}
          sx={{
            alignItems: 'center',
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.50',
            display: enableBulkActions ? 'flex' : 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            px: 2,
            py: 0.5,
            zIndex: 10,
          }}
        >
          <Checkbox
            checked={selectedAll}
            indeterminate={selectedSome}
            onChange={(event) => {
              if (event.target.checked) {
                onSelectAll?.();
              } else {
                onDeselectAll?.();
              }
            }}
          />
          <Button color='inherit' size='small'>
            Delete
          </Button>
          <Button color='inherit' size='small'>
            Edit
          </Button>
        </Stack>
      )}
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell padding='checkbox'>
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      onSelectAll?.();
                    } else {
                      onDeselectAll?.();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((pantry) => {
              const isSelected = selected.includes(pantry.id);
              const data = {
                'Pantry 1': pantry.location1 || false,
                'Pantry 2': pantry.location2 || false,
                'Pantry 3': pantry.location3 || false,
                'Freezer': pantry.location4 || false,
                'Other': pantry.location5 || false,
              };
              const locationString: string[] = [];
              Object.entries(data).forEach(([key, value]) => {
                if (value) {
                  locationString.push(key);
                }
              });
              const location = locationString.join(', ');
              const price = numeral(pantry.price).format(
                `${pantry.currency}0,0.00`
              );

              return (
                <TableRow hover key={pantry.id} selected={isSelected}>
                  <TableCell padding='checkbox'>
                    <Checkbox
                      checked={isSelected}
                      onChange={(
                        event: ChangeEvent<HTMLInputElement>
                      ): void => {
                        if (event.target.checked) {
                          onSelectOne?.(pantry.id);
                        } else {
                          onDeselectOne?.(pantry.id);
                        }
                      }}
                      value={isSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack alignItems='center' direction='row' spacing={1}>
                      {/* <Avatar
                        src={pantry.avatar}
                        sx={{
                          height: 42,
                          width: 42
                        }}
                      >
                        {getInitials(pantry.name)}
                      </Avatar> */}
                      <div>
                        <Link
                          color='inherit'
                          component={RouterLink}
                          href={paths.myPantry.details}
                          variant='subtitle2'
                        >
                          {pantry.name}
                        </Link>
                        <Typography color='text.secondary' variant='body2'>
                          {pantry.note}
                        </Typography>
                      </div>
                    </Stack>
                  </TableCell>
                  <TableCell>{location}</TableCell>
                  <TableCell>{pantry.quantity}</TableCell>
                  <TableCell>
                    <Typography variant='subtitle2'>{price}</Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <IconButton
                      component={RouterLink}
                      // href={paths.myPantry.edit}
                      href={`/myPantry/${pantry.id}/edit`}
                    >
                      <SvgIcon>
                        <Edit02Icon />
                      </SvgIcon>
                    </IconButton>
                    <IconButton
                      component={RouterLink}
                      href={`/myPantry/${pantry.id}`}
                      // href={paths.myPantry.details}
                    >
                      <SvgIcon>
                        <ArrowRightIcon />
                      </SvgIcon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component='div'
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
};

PantryListTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
