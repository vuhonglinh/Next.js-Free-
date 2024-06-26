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
import { LoginBody, LoginBodyType } from '@/schemaValidations/auth.schema'
import { toast, useToast } from '@/components/ui/use-toast'
import authApiRequest from '@/api.request/auth'
import { useRouter } from 'next/navigation'
import { handleErrorApi } from '@/lib/utils'
import { Loader2 } from 'lucide-react'



export default function LoginForm() {
    const [loading, setLoading] = useState<Boolean>(false)
    const router = useRouter()
    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    async function onSubmit(values: LoginBodyType) {
        if (loading) return
        setLoading(true)
        try {
            const result = await authApiRequest.login(values)
            //Gọi api next server
            await authApiRequest.auth({
                sessionToken: result.payload.data.token,
                expiresAt: result.payload.data.expiresAt
            })
            toast({
                description: result.payload.message
            })
            router.push('/')
            router.refresh()
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
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type='email' placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mật khẩu</FormLabel>
                            <FormControl>
                                <Input type='password' placeholder="Mật khẩu" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {!loading ? <Button type="submit" className='!mt-8 w-full'>Submit</Button> : <Button className='!mt-8 w-full' disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                </Button>}
            </form>
        </Form>
    )
}
