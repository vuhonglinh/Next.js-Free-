import { ModeToggle } from '@/components/mode-toggle'
import { Link } from 'lucide-react'
import React from 'react'

export default function Header() {
    return (
        <div>
            <ul>
                <li>
                    <Link href='/login'>Đăng nhập</Link>
                </li>
                <li>
                    <Link href='/register'>Đăng ký</Link>
                </li>
            </ul>
            <ModeToggle />
        </div>
    )
}
