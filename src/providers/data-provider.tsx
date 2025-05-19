'use client';
import { Omr } from '@/components/omr-result-table/omr-result.type';
import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface DataContextType {
    data: Omr[];
    setData: Dispatch<SetStateAction<Omr[]>>;
}

export const DataContext = createContext<DataContextType>({
    data: [],
    setData: () => {},
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState<Omr[]>([]);

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
};
