'use client';
import { updateJsonFile } from '@/actions/file-io.action';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { DataContext } from '@/providers/data-provider';
import { DialogContext } from '@/providers/dialog-provider';
import { useContext, useEffect, useMemo, useState } from 'react';

export function OmrViewDialog() {
    const { open, setOpen } = useContext(DialogContext);
    const { detectedResult, files, setData } = useContext(DataContext);
    const [previewUrl, setPreviewUrl] = useState('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [editedAnswers, setEditedAnswers] = useState<any>([]);

    const getImageUrl = (filename: string) => {
        if (!files) return '';

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const imageFile: any = Array.from(files).find(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (file: any) => file.name === filename
        );
        const url = URL.createObjectURL(imageFile);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    };

    const handleAnswerClick = (serial: number, answer: string) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setEditedAnswers((prev: any[]) => {
            const exists = prev.some((item) => item.serial === serial);

            if (exists) {
                return prev.map((item) =>
                    item.serial === serial
                        ? { ...item, answers: [answer] }
                        : item
                );
            }

            return [...prev, { serial, answers: [answer] }];
        });
    };

    useEffect(() => {
        console.log(editedAnswers);
    }, [editedAnswers]);

    const renderResults = () => {
        const results = detectedResult?.results.map(
            (
                result: {
                    answers: string[];
                    serial: number;
                    question: number;
                },
                index: number
            ) => {
                const answers = result.answers.map((str) => str.toUpperCase());
                const edited = editedAnswers.find(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (item: any) => item.serial === result.serial
                );
                const selectedAnswer = edited?.answers?.[0]?.toUpperCase();

                const isSelected = (option: string) =>
                    selectedAnswer === option;

                const getOptionClass = (option: string) => {
                    const baseClass =
                        'border border-pink-500 w-5 h-5 rounded-full justify-center items-center flex cursor-pointer';
                    const aiDetectedClass = answers.includes(option)
                        ? 'bg-black text-white'
                        : '';
                    const editedClass = isSelected(option)
                        ? 'bg-green-500 text-white'
                        : '';
                    return `${baseClass} ${aiDetectedClass} ${editedClass}`;
                };

                return (
                    <tr
                        key={`${result.serial || result.question}-${index}`}
                        className="border"
                    >
                        <td className="p-1 border">
                            {result.serial || result.question}
                        </td>
                        {['A', 'B', 'C', 'D'].map((option) => (
                            <td key={option} className="p-1">
                                <div
                                    className={getOptionClass(option)}
                                    onClick={() =>
                                        handleAnswerClick(
                                            result.serial,
                                            option.toLowerCase()
                                        )
                                    }
                                >
                                    {option}
                                </div>
                            </td>
                        ))}
                    </tr>
                );
            }
        );

        return results;
    };

    useEffect(() => {
        getImageUrl(detectedResult?.imageName);
    }, [detectedResult]);

    const renderedResult = useMemo(() => {
        return renderResults();
    }, [detectedResult, editedAnswers]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="rounded-none max-h-[80vh] overflow-y-auto px-6 pt-0 flex flex-col">
                <DialogHeader className="pt-12 ">
                    <div className="flex justify-between items-center">
                        <div>
                            <DialogTitle>View OMR</DialogTitle>
                            <DialogDescription>
                                Modify the OMR answers below and click save to
                                update the results.
                            </DialogDescription>
                        </div>

                        <Button
                            className="rounded-none bg-[var(--mkp-primary)] hover:bg-[var(--mkp-accent)]"
                            size={'sm'}
                            onClick={() => {
                                updateJsonFile(
                                    detectedResult.filename,
                                    editedAnswers
                                );

                                setData((prev) =>
                                    prev.map((datum) => {
                                        if (
                                            datum.imageName ===
                                            detectedResult?.imageName
                                        ) {
                                            return {
                                                ...datum,
                                                isRechecked: true,
                                            };
                                        }

                                        return datum;
                                    })
                                );
                                setOpen(false);
                                setEditedAnswers([]);
                            }}
                        >
                            Save Changes
                        </Button>
                    </div>
                </DialogHeader>
                <main className="flex gap-2">
                    <section className="flex-1">
                        <div className="border text-center">AI DETECTED</div>
                        <div className="flex justify-between gap-2">
                            {
                                <>
                                    <table>
                                        <tbody>
                                            {renderedResult?.slice(0, 25)}
                                        </tbody>
                                    </table>
                                    <table>
                                        <tbody>
                                            {renderedResult?.slice(25, 50)}
                                        </tbody>
                                    </table>
                                    <table>
                                        <tbody>
                                            {renderedResult?.slice(50, 75)}
                                        </tbody>
                                    </table>
                                    <table>
                                        <tbody>
                                            {renderedResult?.slice(75, 100)}
                                        </tbody>
                                    </table>
                                </>
                            }
                        </div>
                    </section>

                    <section className="border">
                        <div className="border text-center">ORIGINAL IMAGE</div>
                        <img src={previewUrl} className="" alt="" />
                    </section>
                </main>
            </DialogContent>
        </Dialog>
    );
}
