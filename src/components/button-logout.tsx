"use client"
import authApiRequest from "@/api.request/auth";
import { Button } from "@/components/ui/button";
import { handleErrorApi } from "@/lib/utils";
import { useRouter } from "next/navigation";


export default function ButtonLogout() {
    const router = useRouter()
    const handleLogout = async () => {
        try {
            await authApiRequest.logoutFormNextClientToServer()
            router.push('/login')
        } catch (err) {
            handleErrorApi({ error: err })
        }
    }
    return (
        <Button onClick={handleLogout} size={'sm'}>
            Đăng xuất
        </Button>
    )
}
