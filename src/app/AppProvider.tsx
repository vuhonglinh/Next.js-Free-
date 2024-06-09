"use client"
import { clientSessionToken } from '@/lib/http'
import React, { createContext, useContext, useLayoutEffect, useState } from 'react'


//Để các component con có thể sử dụng clientSessionToken
export default function AppProvider({ children, inititalSessionToken = "" }: { children: React.ReactNode, inititalSessionToken?: string }) {
    //Chay trước cách component con 
    useState(() => {
        //npm run dev nó tưởng đang build, nó sẽ nhảy vào môi trường server
        if (typeof window != 'undefined') {
            clientSessionToken.value = inititalSessionToken
        }
    })
    return (
        <>
            {children}
        </>
    )
}
