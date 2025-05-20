'use client';
import { Omr } from '@/components/omr-result-table/omr-result.type';
import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface DataContextType {
    data: Omr[];
    setData: Dispatch<SetStateAction<Omr[]>>;
    detectedResult: any;
    setDetectedResult: Dispatch<SetStateAction<any[]>>;
    files: any;
    setFiles: Dispatch<SetStateAction<any[]>>;
}

export const DataContext = createContext<DataContextType>({
    data: [],
    setData: () => {},
    detectedResult: [],
    setDetectedResult: () => {},
    files: [],
    setFiles: () => {},
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState<Omr[]>([]);
    const [detectedResult, setDetectedResult] = useState<any>(null);
    const [files, setFiles] = useState<any>(null);

    return (
        <DataContext.Provider
            value={{
                data,
                setData,
                detectedResult,
                setDetectedResult,
                files,
                setFiles,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
