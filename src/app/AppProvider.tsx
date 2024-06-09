"use client"
import { clientSessionToken } from '@/lib/http'
import React, { createContext, useContext, useLayoutEffect, useState } from 'react'


const AppContext = createContext({
    // clientSessionToken: '',
    // setclientSessionToken: (clientSessionToken: string) => { }
})

// export const useAppContext = () => {
//     const context = useContext(AppContext);
//     if (!context) {
//         throw new Error("useAppContext must be used within an AppProvider")
//     }
//     return context
// }

//Để các component con có thể sử dụng clientSessionToken
export default function AppProvider({ children, inititalclientSessionToken = "" }: { children: React.ReactNode, inititalclientSessionToken?: string }) {
    //Chay trước cách component con 
    useState(() => {
        //npm run dev nó tưởng đang build, nó sẽ nhảy vào môi trường server
        if (typeof window != 'undefined') {
            clientSessionToken.value = inititalclientSessionToken
        }
    })
    return (
        <>
            {children}
        </>
    )
}
