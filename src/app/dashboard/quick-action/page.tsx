'use client';

import { OmrViewDialog } from '@/components/omr-view-dialog';
import OmrResultTable from '@/components/omr-result-table/omr-result-table';

import OmrForm from '@/components/omr-form';
import { useContext } from 'react';
import { DataContext } from '@/providers/data-provider';
import Stats from '@/components/stats';
import { Progress } from '@/components/ui/progress';

export default function QuickAction() {
    const { data, stats, files } = useContext(DataContext);

    return (
        <>
            <OmrViewDialog />

            {!data.length ? (
                <OmrForm />
            ) : (
                <>
                    <Stats />
                    <br />
                    {files && (
                        <Progress
                            className="rounded-none"
                            value={
                                ((stats.successCount + stats.failureCount) /
                                    files?.length) *
                                100
                            }
                            indicatorColor="bg-[#00c950]"
                        />
                    )}
                    <br />
                    <OmrResultTable />
                </>
            )}
            <br />
        </>
    );
}
