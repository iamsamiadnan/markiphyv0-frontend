'use client';
import React, { useContext } from 'react';
import { Table, TableBody, TableCell, TableRow } from './ui/table';
import { DataContext } from '@/providers/data-provider';

export default function Stats() {
    const { files, stats } = useContext(DataContext);

    return (
        <Table className="table-fixed text-center border border-[var(--mkp-primary)] shadow-[-4px_4px_0_var(--mkp-primary)] bg-white">
            <TableBody>
                <TableRow>
                    <TableCell>
                        Total Sheets:
                        <span className="text-[var(--mkp-primary)] ml-1">
                            {files ? files?.length : 0}
                        </span>
                    </TableCell>
                    <TableCell>
                        Succeded:
                        <span className="text-[#00c950] ml-1">
                            {stats.successCount}
                        </span>
                    </TableCell>
                    <TableCell>
                        Failed:
                        <span className="text-red-500 ml-1">
                            {stats.failureCount}
                        </span>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
