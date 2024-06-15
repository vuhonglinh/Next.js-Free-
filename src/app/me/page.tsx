import accountApiRequest from "@/api.request/account";
import ProfileForm from "@/app/me/profile-form";
import { Metadata } from "next";
import { cookies } from 'next/headers'

export const metadata: Metadata = {
    title: "Hồ sơ",
    description: "Được tạo bởi Vũ Hồng Lĩnh",
    openGraph: {
        title: 'Next.js',
        description: 'The React Framework for the Web',
        url: 'https://nextjs.org',
        siteName: 'Next.js',
        images: [
            {
                url: 'https://nextjs.org/og.png', // Must be an absolute URL
                width: 800,
                height: 600,
            },
            {
                url: 'https://nextjs.org/og-alt.png', // Must be an absolute URL
                width: 1800,
                height: 1600,
                alt: 'My custom alt',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
};

export default async function MeProfile() {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get("sessionToken")
    //Vì dùng cookie không được fetch trên server
    const result = await accountApiRequest.me(sessionToken?.value || '')

    return (
        <div>
            <h1>Profile</h1>
            <ProfileForm profile={result.payload.data} />
        </div>
    )
}
