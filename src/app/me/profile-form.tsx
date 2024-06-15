"use client"
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { handleErrorApi } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { AccountResType, UpdateMeBody, UpdateMeBodyType } from '@/schemaValidations/account.schema'
import accountApiRequest from '@/api.request/account'

type Profile = AccountResType['data']

export default function ProfileForm({ profile }: { profile: Profile }) {
    const [loading, setLoading] = useState<Boolean>(false)
    const router = useRouter()
    const form = useForm<UpdateMeBodyType>({
        resolver: zodResolver(UpdateMeBody),
        defaultValues: {
            name: profile.name
        }
    })
    async function onSubmit(values: UpdateMeBodyType) {
        if (loading) return
        setLoading(true)
        try {
            const result = await accountApiRequest.updateMe(values)
            toast({
                description: result.payload.message
            })
            router.refresh()//Lấy dữ liệu mới nhất
        } catch (err: any) {
            handleErrorApi({
                error: err,
                setError: form.setError
            })
        } finally {
            setLoading(false)
        }
    }


    return (
        <Form {...form} >
            <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 max-w-[600px] flex-shrink-0 w-full">

                <FormLabel>Họ và tên</FormLabel>
                <FormControl>
                    <Input type='email' readOnly placeholder="Email" value={profile.email} />
                </FormControl>
                <FormMessage />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Họ và tên</FormLabel>
                            <FormControl>
                                <Input type='text' placeholder="Họ và tên" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {!loading ? <Button type="submit" className='!mt-8 w-full'>Cập nhật</Button> : <Button className='!mt-8 w-full' disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                </Button>}
            </form>
        </Form>
    )
}
