import SelectInput from '@/components/SelectInput';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { OmrViewDialog } from '@/components/omr-view-dialog';
import OmrResultTable from '@/components/omr-result-table/omr-result-table';
import UploadFiles from '@/components/upload-files';

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

            <UploadFiles
                label="Upload OMR Sheets"
                src="/upload-files.svg"
                description="Click To Upload OMR Sheets"
            />

            <br />
            <br />
            <OmrResultTable />
        </>
    );
}
