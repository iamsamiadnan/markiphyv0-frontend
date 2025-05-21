'use client';
import React, { useContext } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import { DataContext } from '@/providers/data-provider';

export default function ConfirmDialog({
    handleOnConfirm,
}: {
    handleOnConfirm: () => void;
}) {
    const { files } = useContext(DataContext);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    className={`rounded-none bg-[var(--mkp-primary)] hover:bg-[var(--mkp-accent)] w-full text-white hover:text-white ${
                        !files && 'disabled:bg-gray-500'
                    }`}
                    variant="outline"
                    disabled={!files && true}
                >
                    Confirm
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-none border border-[var(--mkp-primary)]">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    {/* <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </AlertDialogDescription> */}
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-none bg-[#ff4d4f] hover:bg-[#d9363e] text-white hover:text-white">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="rounded-none bg-[#00c950] hover:bg-[#00b247] text-white hover:text-white"
                        onClick={handleOnConfirm}
                    >
                        Start Processing
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
