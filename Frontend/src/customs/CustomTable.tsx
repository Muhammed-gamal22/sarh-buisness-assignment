import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    RowSelectionState,
    SortingState,
    useReactTable,
  } from "@tanstack/react-table";
import CustomButton from "./Button";
  
  type Props<T> = {
    data: T[];
    columns: ColumnDef<T>[];
    loading?: boolean;
    pageIndex: number;
    pageSize: number;
    totalPages: number;
    // sorting: SortingState;
    // onSortingChange: (sorting: SortingState) => void;
    // rowSelection: RowSelectionState;
    // onRowSelectionChange: (
    //   updater: RowSelectionState
    // ) => void;
  
    onPageChange: (page: number) => void;
  };
  
  export default function CustomTable<T>({
    data,
    columns,
    loading,
  
    pageIndex,
    pageSize,
    totalPages,
  
    // sorting,
    // onSortingChange,
  
    // rowSelection,
    // onRowSelectionChange,
  
    onPageChange,
  }: Props<T>) {
    const table = useReactTable({
      data,
      columns,
      state: {
        // sorting,
        // rowSelection,
        pagination: {
          pageIndex,
          pageSize,
        },
      },
      manualPagination: true,
      
      manualSorting: false,
      pageCount: totalPages,
      enableRowSelection: true,
    //   onSortingChange,
    //   onRowSelectionChange,
      getCoreRowModel: getCoreRowModel(),
    });
  
    return (
      <div className="space-y-4">
        <table className="w-full border-none">
          <thead className="bg-muted/50 text-muted-foreground">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-right p-3 font-medium"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex gap-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
  
                      {{
                        asc: "↑",
                        desc: "↓",
                      }[
                        header.column.getIsSorted() as string
                      ] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
  
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center p-5"
                >
                  Loading...
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr className="border-t border-border hover:bg-muted/30" key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="border-b p-3"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
  
        <div className="flex p-2 gap-3 items-center">
            <CustomButton  
            className="!bg-muted text-black disabled:!cursor-not-allowed"
            disabled={pageIndex === 0}
            onClick={() =>
              onPageChange(pageIndex - 1)
            } >
              Prev
            </CustomButton>
          <span>
            Page {pageIndex + 1} / {totalPages}
          </span>
  
          <CustomButton 
            disabled={pageIndex + 1 >= totalPages}
            onClick={() =>
              onPageChange(pageIndex + 1)
            }
          >
            Next
          </CustomButton>
        </div>
      </div>
    );
  }