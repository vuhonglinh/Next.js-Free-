"use client"
import React, { useRef, useState } from 'react'
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
import { toast, } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { handleErrorApi } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { CreateProductBody, CreateProductBodyType, ProductResType, UpdateProductBodyType } from '@/schemaValidations/product.schema'
import productApiRequest from '@/api.request/product'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'



type Product = ProductResType['data']

export default function ProductAddForm({ product }: { product?: Product }) {
    const [file, setFile] = useState<File | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [loading, setLoading] = useState<Boolean>(false)
    const router = useRouter()
    const form = useForm<CreateProductBodyType>({
        resolver: zodResolver(CreateProductBody),
        defaultValues: {
            name: product?.name ?? "",
            price: product?.price ?? 0,
            description: product?.description ?? "",
            image: product?.image ?? "",
        }
    })
    const image = form.watch('image')
    const createProduct = async (values: CreateProductBodyType) => {
        const result = await productApiRequest.create(values);
        toast({
            description: result.payload.message
        })
        router.push('/products')
        router.refresh()
    }


    const updateProduct = async (id: number, values: UpdateProductBodyType) => {
        const result = await productApiRequest.update(id, values);
        toast({
            description: result.payload.message
        })
        router.refresh()
    }

    async function onSubmit(_values: CreateProductBodyType) {
        if (loading) return
        setLoading(true)
        try {
            let imageUrl = product?.image;
            if (file) {
                const formData = new FormData()
                formData.append('file', file as File)
                const uploadImageResult = await productApiRequest.uploadImgae(formData)
                imageUrl = uploadImageResult.payload.data
            }
            const values = {
                ..._values,
                image: imageUrl!
            }
            if (product) {
                await updateProduct(product.id, values)
            } else {
                await createProduct(values)
            }
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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên sản phẩm</FormLabel>
                            <FormControl>
                                <Input type='text' placeholder="Tên sản phẩm" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Gía</FormLabel>
                            <FormControl>
                                <Input type='text' placeholder="Gía sản phẩm" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mô tả</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Mô tả sản phẩm" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Hình ảnh</FormLabel>
                            <FormControl>
                                <Input type='file' ref={inputRef} accept='image/*' placeholder="Mô tả sản phẩm"
                                    onClick={() => {
                                        if (inputRef.current) {
                                            inputRef.current.value = ''
                                        }
                                    }}
                                    onChange={(event) => {
                                        const file = event.target.files?.[0];
                                        if (file) {
                                            setFile(file);
                                            field.onChange("http://localhost:3000/" + file.name)
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {(file || image) && (
                    <div>
                        <Image
                            src={file ? URL.createObjectURL(file) : image}
                            alt="Picture of the author"
                            height={128}
                            width={128}
                            className='w-32 h-32 object-cover'
                        />
                        <Button variant={'destructive'} onClick={() => {
                            setFile(null);
                            form.setValue('image', '')
                        }}>Xóa hình ảnh</Button>
                    </div>)}
                {!loading ? <Button type="submit" className='!mt-8 w-full'>Thêm</Button> : <Button className='!mt-8 w-full' disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                </Button>}
            </form>
        </Form>
    )
}
