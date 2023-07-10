import {
  Table as MuiTable,
  TableCell,
  Paper,
  TableHead,
  TableRow,
  TableBody,
  TableContainer,
  TablePagination
} from '@mui/material';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender
} from '@tanstack/react-table';

interface TableProps<TData = object> {
  data: TData[];
  columns: ColumnDef<object, unknown>[];
}

const Table = <TData extends object>({ data, columns }: TableProps<TData>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    //
    initialState: { pagination: { pageSize: 15 } },
    debugTable: true
  });
  return (
    <Paper elevation={2} >
      <TableContainer>
        <MuiTable >
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id} className="px-2">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="whitespace-nowrap px-2 text-ellipsis overflow-hidden max-w-[200px]"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
        <TablePagination
          rowsPerPageOptions={[5, 15, 50]}
          component="div"
          count={data.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, newPage) => {
            table.setPageIndex(newPage);
          }}
          onRowsPerPageChange={(e) => table.setPageSize(Number(e.target.value))}
          labelRowsPerPage="שורות בעמוד"
          labelDisplayedRows={(state) => {
            return `${state.from}-${state.to} מתוך ${state.count}`;
          }}
        />
      </TableContainer>
    </Paper>
  );
};

export default Table;
