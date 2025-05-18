'use client';

import { ColumnDef } from '@tanstack/react-table';

import { useContext } from 'react';
import { DialogContext } from '@/providers/dialog-provider';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Omr, Status } from './omr.type';
import { Checkbox } from '../ui/checkbox';

//   roll: string
//   marks: number
//   status: `${Status}`,
//   action: `${Action}`,
//   isRechecked: boolean

export const omrColumns: ColumnDef<Omr>[] = [
    {
        accessorKey: 'roll',
        header: 'Roll',
    },

    {
        accessorKey: 'imageUrl',
        header: 'Omr Sheet',
    },
    {
        accessorKey: 'marks',
        header: 'Marks',
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.getValue('status') as Status;
            return (
                <Badge className="w-[77.52px] rounded-none" variant={status}>
                    {status}
                </Badge>
            );
        },
    },
    {
        accessorKey: 'isRechecked',
        header: 'Is Rechecked?',
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-center">
                    <Checkbox
                        className="rounded-full border-[var(--mkp-primary)] data-[state=checked]:bg-[#00c950] data-[state=checked]:border-[#00c950] disabled"
                        checked={row.getValue('isRechecked')}
                    />
                </div>
            );
        },
    },
    {
        accessorKey: 'action',
        header: 'Action',
        cell: () => {
            return <ViewButton label="View" />;
        },
    },
];

export const ViewButton = ({ label }: { label: string }) => {
    const { setOpen } = useContext(DialogContext);

    return (
        <Button
            className="rounded-none w-full bg-[var(--mkp-primary)] hover:bg-[var(--mkp-accent)]"
            onClick={() => setOpen(true)}
        >
            {label}
        </Button>
    );
};
