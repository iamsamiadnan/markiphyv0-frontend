'use client';
import React from 'react';
import { DataTable } from '../ui/data-table';
import { omrColumns } from './omr-columns';
import { omrs } from './sample-data';
import { Table, TableHead, TableHeader, TableRow } from '../ui/table';

export default function LogTable() {
    return (
        <>
            {/* <table>
                <thead>
                    <tr>
                        {omrColumns.map((column) => (
                            <td>{column.header?.toString()}</td>
                        ))}
                    </tr>
                </thead>
            </table> */}
            {/* <Table>
                <TableHeader>
                    <TableRow>
                        {omrColumns.map((column) => (
                            <TableHead>{column.header?.toString()}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
            </Table> */}

            <DataTable columns={omrColumns} data={omrs} />
        </>
    );
}
