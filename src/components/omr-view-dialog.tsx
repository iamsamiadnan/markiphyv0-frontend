'use client';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogContext, DialogContextType } from '@/providers/dialog-provider';
import Image from 'next/image';
import { useContext } from 'react';

export function OmrViewDialog() {
    const { open, setOpen } = useContext(DialogContext);

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
                        >
                            Save Changes
                        </Button>
                    </div>
                </DialogHeader>
                <main className="flex gap-2">
                    <section className="flex-1">
                        <div className="border text-center">AI DETECTED</div>
                        <div className="flex justify-between gap-2">
                            {new Array(4).fill(undefined).map(() => (
                                <table className="text-sm">
                                    <thead></thead>
                                    <tbody>
                                        {new Array(25)
                                            .fill(undefined)
                                            .map((i, idx) => {
                                                const random =
                                                    Math.floor(
                                                        Math.random() * 4
                                                    ) + 1;

                                                return (
                                                    <tr
                                                        key={idx}
                                                        className="border"
                                                    >
                                                        <td className="p-1 border">
                                                            {idx + 1}
                                                        </td>
                                                        <td className="p-1">
                                                            <div
                                                                className={`border border-pink-500 w-5 h-5 rounded-full justify-center items-center flex ${
                                                                    random ==
                                                                        1 &&
                                                                    'bg-black text-white'
                                                                }`}
                                                            >
                                                                A
                                                            </div>
                                                        </td>
                                                        <td className="p-1 ">
                                                            <div
                                                                className={`border border-pink-500 w-5 h-5 rounded-full justify-center items-center flex ${
                                                                    random ==
                                                                        2 &&
                                                                    'bg-black text-white'
                                                                }`}
                                                            >
                                                                B
                                                            </div>
                                                        </td>
                                                        <td className="p-1 ">
                                                            <div
                                                                className={`border border-pink-500 w-5 h-5 rounded-full justify-center items-center flex ${
                                                                    random ==
                                                                        3 &&
                                                                    'bg-black text-white'
                                                                }`}
                                                            >
                                                                C
                                                            </div>
                                                        </td>
                                                        <td className="p-1 ">
                                                            <div
                                                                className={`border border-pink-500 w-5 h-5 rounded-full justify-center items-center flex ${
                                                                    random ==
                                                                        4 &&
                                                                    'bg-black text-white'
                                                                }`}
                                                            >
                                                                D
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            ))}
                        </div>
                    </section>

                    <section className="border">
                        <div className="border text-center">ORIGINAL IMAGE</div>
                        <img
                            src="/Image_047.jpg"
                            className="h-[713.87px]"
                            alt=""
                        />
                    </section>
                </main>
            </DialogContent>
        </Dialog>
    );
}
