"use client"
import productApiRequest from "@/api.request/product"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { handleErrorApi } from "@/lib/utils"
import { ProductResType } from '@/schemaValidations/product.schema'
import { useRouter } from "next/navigation"
import React from 'react'



export default function DeleteProduct({ product }: { product: ProductResType['data'] }) {

    const route = useRouter()
    const deleteProduct = async () => {
        try {
            const result = await productApiRequest.delete(product.id)
            toast({
                description: result.payload.message
            })
            route.refresh()
        } catch (error) {
            handleErrorApi({ error })
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={'destructive'}>Xóa</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Bạn có hoàn toàn chắc chắn không?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Hành động này không thể được hoàn tác. Điều này sẽ xóa vĩnh viễn tài khoản của bạn và xóa dữ liệu của bạn khỏi máy chủ của chúng tôi.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteProduct}>Tiếp tục</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
