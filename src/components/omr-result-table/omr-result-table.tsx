'use client';
import React, { useContext } from 'react';
import { DataTable } from '../ui/data-table';
import { omrColumns } from './omr-result-cols';
import { DataContext } from '@/providers/data-provider';

export default function OmrResultTable() {
    const { data } = useContext(DataContext);

    return (
        <>
            <DataTable columns={omrColumns} data={data} />
        </>
    );
}
