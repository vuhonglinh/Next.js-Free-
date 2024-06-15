import accountApiRequest from '@/api.request/account'
import ButtonLogout from '@/components/button-logout'
import { ModeToggle } from '@/components/mode-toggle'
import { AccountResType } from '@/schemaValidations/account.schema'
import { cookies } from 'next/headers'
import Link from 'next/link'

import React from 'react'

export default async function Header({ user }: { user: AccountResType['data'] | null }) {
    return (
        <div>
            <ul className='flex items-center justify-center gap-5'>
                <li>
                    <Link href='/products'>Sản phẩm</Link>
                </li>
                {
                    user ? (
                        <>
                            <li>
                                <span>Xin chào {user.name}</span>
                            </li>
                            <li>
                                <ButtonLogout />
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link href='/login'>Đăng nhập</Link>
                            </li>
                            <li>
                                <Link href='/register'>Đăng ký</Link>
                            </li>
                        </>
                    )
                }
                <ModeToggle />
            </ul>
        </div>
    )
}
