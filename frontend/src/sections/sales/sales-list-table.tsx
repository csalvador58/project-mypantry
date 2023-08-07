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
import { Sales } from 'src/types/sales';

interface SalesListTableProps {
  count?: number;
  items?: Sales[];
  onDeselectAll?: () => void;
  onDeselectOne?: (itemId: string) => void;
  onPageChange?: (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelectAll?: () => void;
  onSelectOne?: (itemId: string) => void;
  page?: number;
  rowsPerPage?: number;
  selected?: string[];
  deleteHandler: () => void;
}

export const SalesListTable: FC<SalesListTableProps> = (props) => {
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
    deleteHandler = () =>{},
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;
  const enableBulkActions = selected.length > 0;

  const handleDelete = () => {
    deleteHandler();
  }

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
          <Button color='inherit' size='small' onClick={handleDelete}>
            Delete
          </Button>
          {/* <Button color='inherit' size='small'>
            Edit
          </Button> */}
        </Stack>
      )}
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              
              <TableCell>Name</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Sale Price</TableCell>
              <TableCell>Sale Qty</TableCell>
              <TableCell>Reg Price</TableCell>
              <TableCell>Reg Qty</TableCell>
              <TableCell>Store</TableCell>
              {/* <TableCell align='right'>Actions</TableCell> */}
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
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((saleItem) => {
              const isSelected = selected.includes(saleItem.id);
              const data = {
                'Central Market': saleItem.location1 || false,
                'Location2 not defined': saleItem.location2 || false,
                'Location3 not defined': saleItem.location3 || false,
                'Location4 not defined': saleItem.location4 || false,
                'Location5 not defined': saleItem.location5 || false,
              };
              const storeLocationString: string[] = [];
              Object.entries(data).forEach(([key, value]) => {
                if (value) {
                  storeLocationString.push(key);
                }
              });
              const storeLocation = storeLocationString.join(', ');
              const salePrice = numeral(saleItem.salePrice).format(
                `${saleItem.currency}0,0.00`
              );
              const regPrice = numeral(saleItem.basePrice).format(
                `${saleItem.currency}0,0.00`
              );

              return (
                <TableRow hover key={saleItem.id} selected={isSelected}>
                  <TableCell>
                    <Stack alignItems='center' direction='row' spacing={1}>
                      {/* <Avatar
                        src={saleItem.avatar}
                        sx={{
                          height: 42,
                          width: 42
                        }}
                      >
                        {getInitials(saleItem.name)}
                      </Avatar> */}
                      <div>
                        <Link
                          color='inherit'
                          component={RouterLink}
                          href={paths.myPantry.details}
                          variant='subtitle2'
                        >
                          {saleItem.name}
                        </Link>
                        {/* <Typography color='text.secondary' variant='body2'>
                          {saleItem.note}
                        </Typography> */}
                      </div>
                    </Stack>
                  </TableCell>
                  <TableCell>{saleItem.note}</TableCell>
                  <TableCell>
                    <Typography variant='subtitle2'>{salePrice}</Typography>
                  </TableCell>
                  <TableCell>{saleItem.saleQuantity}</TableCell>
                  <TableCell>
                    <Typography variant='subtitle2'>{regPrice}</Typography>
                  </TableCell>
                  <TableCell>{saleItem.baseQuantity}</TableCell>
                  <TableCell>{storeLocation}</TableCell>
                  <TableCell padding='checkbox'>
                    <Checkbox
                      checked={isSelected}
                      onChange={(
                        event: ChangeEvent<HTMLInputElement>
                      ): void => {
                        if (event.target.checked) {
                          onSelectOne?.(saleItem.id);
                        } else {
                          onDeselectOne?.(saleItem.id);
                        }
                      }}
                      value={isSelected}
                    />
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

SalesListTable.propTypes = {
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
  deleteHandler: PropTypes.func.isRequired,
};
