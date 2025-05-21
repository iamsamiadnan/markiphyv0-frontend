'use client';
import { Omr } from '@/components/omr-result-table/omr-result.type';
import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface DataContextType {
    data: Omr[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    detectedResult: any;
    files: FileList | null;
    stats: StatsType;

    setData: Dispatch<SetStateAction<Omr[]>>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setDetectedResult: Dispatch<SetStateAction<any[]>>;
    setFiles: Dispatch<SetStateAction<FileList | null>>;
    setStats: Dispatch<SetStateAction<StatsType>>;
}

interface StatsType {
    successCount: number;
    failureCount: number;
}

export const DataContext = createContext<DataContextType>({
    data: [],
    detectedResult: [],
    files: null,
    stats: { successCount: 0, failureCount: 0 },

    setData: () => {},
    setDetectedResult: () => {},
    setFiles: () => {},
    setStats: () => {},
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState<Omr[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [detectedResult, setDetectedResult] = useState<any>(null);
    const [files, setFiles] = useState<FileList | null>(null);
    const [stats, setStats] = useState<StatsType>({
        successCount: 0,
        failureCount: 0,
    });

    return (
        <DataContext.Provider
            value={{
                data,
                detectedResult,
                files,
                stats,

                setData,
                setDetectedResult,
                setFiles,
                setStats,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
