'use client';
import React, { useContext } from 'react';
import { DataTable } from '../ui/data-table';
import { omrColumns } from './omr-result-cols';
import { omrs } from './sample-data';
import { Table, TableHead, TableHeader, TableRow } from '../ui/table';
import { DataContext } from '@/providers/data-provider';

export default function OmrResultTable() {
    const { data } = useContext(DataContext);

    return <DataTable columns={omrColumns} data={data} />;
}
