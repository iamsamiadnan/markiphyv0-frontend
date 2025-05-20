'use client';

import { ColumnDef } from '@tanstack/react-table';

import { useContext } from 'react';
import { DialogContext } from '@/providers/dialog-provider';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Omr, Status } from './omr-result.type';
import { Checkbox } from '../ui/checkbox';
import { readJsonFromFile } from '@/actions/file-io.action';
import { DataContext } from '@/providers/data-provider';

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
        accessorKey: 'imageName',
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
        cell: ({ row }) => {
            return <ViewButton roll={row.getValue('roll')} label="View" />;
        },
    },
];

export const ViewButton = ({
    label,
    roll,
}: {
    label: string;
    roll: string;
}) => {
    const { setOpen } = useContext(DialogContext);
    const { setDetectedResult } = useContext(DataContext);

    const handleOnView = async () => {
        const filename = `_${roll}.json`;
        const detectedResult = await readJsonFromFile(filename);
        detectedResult.filename = filename;
        console.log(detectedResult);
        setDetectedResult(detectedResult);
        setOpen(true);
    };
    return (
        <Button
            className="rounded-none w-full bg-[var(--mkp-primary)] hover:bg-[var(--mkp-accent)]"
            onClick={handleOnView}
        >
            {label}
        </Button>
    );
};
