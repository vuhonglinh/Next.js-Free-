import productApiRequest from '@/api.request/product'
import DeleteProduct from '@/app/products/_components/delete-product';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export const metadata: Metadata = {
    title: 'Chi tiết sản phẩm',
}

export default async function ProductListPage() {
    const { payload } = await productApiRequest.getList();
    const productList = payload.data
    return (
        <div>
            <h1>Danh sách sản phẩm</h1>
            <Link href={'/products/add'}>
                <Button variant={'secondary'}>Thêm sản phẩm</Button>
            </Link>
            <div className='space-y-5'>
                {productList.map((product) => (
                    <div key={product.id} className='flex space-x-4'>
                        <div>
                            <Link href={`/products/${product.id}`}>
                                <Image src={product.image} height={180}
                                    width={180}
                                    alt={product.name}
                                />
                            </Link>

                        </div>
                        <h3>{product.name}</h3>
                        <div>{product.price}</div>
                        <div className='flex space-x-2 items-start'>
                            <Link href={`/products/${product.id}/edit`}>
                                <Button variant={'outline'}>Sửa</Button>
                            </Link>
                            <DeleteProduct product={product} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
