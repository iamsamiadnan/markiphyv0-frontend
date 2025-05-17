"use client"
import { createContext, Dispatch, SetStateAction, useState } from 'react'

export interface DialogContextType {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}
export const DialogContext = createContext<DialogContextType>({ open: false, setOpen: () => { } })

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <DialogContext.Provider value={{ open, setOpen }}>
            {children}
        </DialogContext.Provider>
    )
}
