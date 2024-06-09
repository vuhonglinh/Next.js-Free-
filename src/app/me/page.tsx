import accountApiRequest from "@/api.request/account";
import Profile from "@/app/me/profile";
import { cookies } from 'next/headers'

export default async function MeProfile() {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get("sessionToken")
    const result = await accountApiRequest.me(sessionToken?.value || '')

    return (
        <div>
            <h1>Profile</h1>
            <p>
                {result.payload.data.name}
            </p>
            <Profile />
        </div>
    )
}
