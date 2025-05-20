'use client';
import Image from 'next/image';
import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import { saveJsonToFile } from '@/actions/file-io.action';
import { DataContext } from '@/providers/data-provider';
import { Omr } from './omr-result-table/omr-result.type';
import { Progress } from './ui/progress';
import { Table, TableBody, TableCell, TableRow } from './ui/table';

export default function UploadFiles({
    label,
    src,
    description,
}: {
    label: string;
    src: string;
    description: string;
}) {
    // const [files, setFiles] = useState<FileList | null>(null);

    const { files, setFiles } = useContext(DataContext);
    const [progress, setProgress] = useState(0);
    const [succededCount, setSucceded] = useState(0);
    const [failedCount, setFailed] = useState(0);

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { data, setData } = useContext(DataContext);

    useEffect(() => {
        console.log(files);
    }, [files]);

    const handleOnConfirm = async () => {
        if (!files) return;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            console.log(file);

            const data: Omr = {
                roll: '-------',
                imageName: file.name,
                marks: 0,
                status: 'PENDING',
                isRechecked: false,
            };
            setData((prev) => [data, ...prev]);

            const formData = new FormData();
            formData.append('image', file);

            // needed for api, provided data is dummy, no use at api end till now
            formData.append('examId', 'cm6n7mkaf00smuf5xv35zn7xq');
            formData.append('examStartLogId', 'cm8mplcp4097ctc84tses67bx');

            try {
                const studentResp = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/extract_roll`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

                const student: {
                    data: { roll_number: string };
                    error: { status: boolean; message: string };
                } = studentResp.data;

                if (
                    student.error.status ||
                    student.data.roll_number.includes('None')
                ) {
                    throw new Error(
                        student.error.message === ''
                            ? JSON.stringify({
                                  filename: file.name,
                                  roll_number: student.data.roll_number,
                              })
                            : student.error.message
                    );
                }

                // console.log(`DEBUG: `, student.data.roll_number);
                const omrResp = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/omr_processing`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                const processedImage = omrResp.data;

                console.log(`PROCESSED_IMAGE: `, processedImage);
                const result = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/process_verified`,
                    processedImage,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                const payload = result.data;

                console.log(`RESULT: `, payload);

                payload.imageName = file.name;
                const roll_number = student.data.roll_number;

                saveJsonToFile(payload, `_${student.data.roll_number}.json`);

                setData((prev) =>
                    prev.map((datum) => {
                        if (datum.imageName === file.name) {
                            return {
                                ...datum,
                                status: 'DONE',
                                roll: roll_number,
                            };
                        }

                        return datum;
                    })
                );

                setSucceded((prev) => prev + 1);
                setProgress((prev) => prev + 1);
            } catch (error) {
                console.error(error);
                setData((prev) =>
                    prev.map((datum) => {
                        if (datum.imageName === file.name) {
                            return {
                                ...datum,
                                status: 'FAILED',
                                roll: '-------',
                            };
                        }

                        return datum;
                    })
                );
                setFailed((prev) => prev + 1);
            }
        }
    };

    return (
        <>
            <span className="text-[var(--mkp-text-primary)] mb-2 block text-sm">
                {label}
            </span>

            <div
                className="cursor-pointer hover:opacity-80"
                onClick={() => fileInputRef.current?.click()}
            >
                <div className="mb-5 border border-[var(--mkp-primary)] bg-white h-40 flex flex-col justify-center items-center">
                    <Image
                        src={src}
                        width={66}
                        height={94.01}
                        alt="upload-files"
                        className="mb-3.5"
                    />
                    <span className="block text-sm text-[var(--mkp-text-accent)] underline">
                        {files
                            ? `Total OMR Sheets: ${files?.length}`
                            : description}
                    </span>
                </div>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                    className="hidden "
                    ref={fileInputRef}
                />
            </div>
            <Button
                type="submit"
                className="rounded-none bg-[var(--mkp-primary)] hover:bg-[var(--mkp-accent)] w-full"
                onClick={handleOnConfirm}
            >
                Confirm
            </Button>

            {/* (currentStep / totalSteps) * 100 */}

            {files && (
                <>
                    <Progress
                        className="rounded-none mt-6"
                        value={
                            ((succededCount + failedCount) / files?.length) *
                            100
                        }
                        indicatorColor="bg-[#00c950]"
                    />
                </>
            )}

            {/* <div className="border border-[var(--mkp-primary)] flex justify-between h-12 items-center shadow-[-4px_4px_0_var(--mkp-primary)] px-6">
                <div className="flex gap-1">
                    Total OMR Sheets:
                    <div className="text-[var(--mkp-text-secondary)]">
                        {files ? files?.length : 0}
                    </div>
                </div>
                <div className="flex gap-1">
                    Succeed:
                    <div className="text-[#00c950]">{data?.length}</div>
                </div>
                <div className="flex gap-1">
                    Failed: <div className="text-red-500">0</div>
                </div>
            </div> */}

            <Table className="mt-6 border border-[var(--mkp-primary)] shadow-[-4px_4px_0_var(--mkp-primary)] h-12 ">
                <TableBody>
                    <TableRow>
                        <TableCell>
                            Total Sheets:
                            <span className="text-[var(--mkp-primary)] ml-1">
                                {files ? files?.length : 0}
                            </span>
                        </TableCell>
                        <TableCell>
                            Succeded:
                            <span className="text-[#00c950] ml-1">
                                {succededCount}
                            </span>
                        </TableCell>
                        <TableCell>
                            Failed:
                            <span className="text-red-500 ml-1">
                                {failedCount}
                            </span>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    );
}
