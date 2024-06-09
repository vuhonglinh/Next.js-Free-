"use client"
import React from 'react'
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
import { useToast } from '@/components/ui/use-toast'
import authApiRequest from '@/api.request/auth'
import { useRouter } from 'next/navigation'



export default function LoginForm() {
    const { toast } = useToast()
    const router = useRouter()
    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    async function onSubmit(values: LoginBodyType) {

        try {
            const result = await authApiRequest.login(values)
            //Gọi api next server
            await authApiRequest.auth({ clientSessionToken: result.payload.data.token })
            router.push('/me')
        } catch (err: any) {
            //Nếu thất bại sẽ reject
            const errors = err.payload.errors as {
                field: string,
                message: string
            }[]

            if (err.status === 422) {
                errors.forEach(error => {
                    return form.setError(error.field as 'email' | 'password', {
                        type: 'server',
                        message: error.message
                    })
                })
            } else {
                toast({
                    variant: 'destructive',
                    description: err.payload.message
                })
            }
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
                <Button type="submit" className='!mt-8 w-full'>Submit</Button>
            </form>
        </Form>
    )
}
