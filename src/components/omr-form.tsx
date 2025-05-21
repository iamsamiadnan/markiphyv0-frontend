import UploadFiles from './upload-files';
import SelectInput from './SelectInput';
import { Label } from './ui/label';

export default function OmrForm() {
    return (
        <>
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
        </>
    );
}
