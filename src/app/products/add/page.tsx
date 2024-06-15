import ProductAddForm from '@/app/products/_components/product-add-form'
import React from 'react'

export default function ProductPage() {
    return (
        <div>
            <h1 className='text-center'>Thêm sản phẩm</h1>
            <div className='flex items-center justify-center w-full'>
                <ProductAddForm />
            </div>
        </div>
    )
}
