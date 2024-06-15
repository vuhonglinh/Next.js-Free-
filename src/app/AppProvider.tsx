"use client"
import { clientSessionToken } from '@/lib/http'
import { AccountResType } from '@/schemaValidations/account.schema'
import React, { createContext, useContext, useLayoutEffect, useState } from 'react'

type User = AccountResType['data']
const AppContext = createContext<{
    user: User | null
    setUser: (user: User | null) => void
}>({
    user: null,
    setUser: () => { }
})

export const useAppContext = () => {
    const context = useContext(AppContext)
    return context
}

//Để các component con có thể sử dụng clientSessionToken
export default function AppProvider({ children, inititalSessionToken = "", user: userProp }: { children: React.ReactNode, inititalSessionToken?: string, user: User | null }) {

    const [user, setUser] = useState(userProp)

    //Chay trước cách component con 
    useState(() => {
        //npm run dev nó tưởng đang build, nó sẽ nhảy vào môi trường server
        if (typeof window != 'undefined') {
            clientSessionToken.value = inititalSessionToken
        }
    })
    return (
        <AppContext.Provider value={{ user, setUser }}>
            {children}
        </AppContext.Provider>
    )
}
