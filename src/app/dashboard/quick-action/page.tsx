import { DataTable } from '@/components/ui/data-table';
import { omrColumns } from '@/components/omr-table/omr-columns';
import { omrs } from '@/components/omr-table/sample-data';
import Select from '@/components/Select';
import SelectInput from '@/components/SelectInput';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import LogTable from '@/components/omr-table/log-table';
import { OmrViewDialog } from '@/components/omr-view-dialog';

export default function QuickAction() {
    return (
        <>
            <OmrViewDialog />
            <div className="flex gap-5 mb-5">
                <fieldset className="flex-1">
                    <Label
                        htmlFor="select-course"
                        className="text-[var(--mkp-text-primary)] mb-2"
                    >
                        Select Course
                    </Label>
                    <SelectInput selectValue="Select Course" />
                </fieldset>

                <fieldset className="flex-1">
                    <Label
                        htmlFor="select-course"
                        className="text-[var(--mkp-text-primary)] mb-2"
                    >
                        Select Exam
                    </Label>
                    <SelectInput selectValue="Select Exam" />
                </fieldset>
            </div>

            <div className="mb-5">
                <span className="text-[var(--mkp-text-primary)] mb-2 block text-sm">
                    Upload OMR Sheet
                </span>
                <div className="border border-[var(--mkp-primary)] bg-white h-40 flex flex-col justify-center items-center">
                    <Image
                        src="/upload-files.svg"
                        width={66}
                        height={94.01}
                        alt="upload-files"
                        className="mb-3.5"
                    />
                    <span className="block text-sm text-[var(--mkp-text-accent)] underline">
                        Upload OMR Sheets
                    </span>
                </div>
            </div>

            <Button
                type="submit"
                className="rounded-none bg-[var(--mkp-primary)] hover:bg-[var(--mkp-accent)] w-full"
            >
                Confirm
            </Button>
            <br />
            <br />
            <LogTable />
        </>
    );
}
