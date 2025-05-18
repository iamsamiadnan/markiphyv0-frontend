'use client';

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from './button';
import { Input } from './input';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        },
        getPaginationRowModel: getPaginationRowModel(),
    });

    const pageSize = table.getState().pagination.pageSize;
    const pageIndex = table.getState().pagination.pageIndex;
    const totalRows = table.getCoreRowModel().rows.length;

    const start = pageIndex * pageSize + 1;
    const end = Math.min(start + pageSize - 1, totalRows);

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="px-0" colSpan={5}>
                            <div className="flex gap-6 justify-between pb-4">
                                <Input
                                    placeholder="Search rolls   ..."
                                    value={
                                        (table
                                            .getColumn('roll')
                                            ?.getFilterValue() as string) ?? ''
                                    }
                                    onChange={(event) =>
                                        table
                                            .getColumn('roll')
                                            ?.setFilterValue(event.target.value)
                                    }
                                    className="rounded-none border-[var(--mkp-primary)] w-[200px]"
                                />

                                <div className="flex items-center">
                                    <div className="mr-2">
                                        {start} - {end} of {totalRows}
                                    </div>
                                    <Button
                                        className="rounded-none bg-[var(--mkp-primary)] hover:bg-[var(--mkp-accent)]"
                                        onClick={() => table.previousPage()}
                                    >
                                        <ChevronLeft className="size-4" />
                                    </Button>
                                    <Button
                                        className="rounded-none bg-[var(--mkp-primary)] hover:bg-[var(--mkp-accent)]"
                                        onClick={() =>
                                            table.getCanNextPage() &&
                                            table.nextPage()
                                        }
                                    >
                                        <ChevronRight className="size-4" />
                                    </Button>
                                </div>
                            </div>
                        </TableHead>
                    </TableRow>
                </TableHeader>
            </Table>
            <div className="h-[400px] overflow-y-scroll border border-[var(--mkp-primary)]">
                <Table>
                    <TableHeader className="sticky top-0 bg-[var(--mkp-background)] drop-shadow-xs">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
