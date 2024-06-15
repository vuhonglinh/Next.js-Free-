import productApiRequest from "@/api.request/product"
import ProductAddForm from "@/app/products/_components/product-add-form";
import { Metadata, ResolvingMetadata } from "next";
import { cache } from "react";


const getDetail = cache(productApiRequest.getDetail)

export async function generateMetadata(//Chỉ dùng trong server components
    { params }: { params: { id: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const result = await getDetail(Number(params.id))
    const product = result.payload.data
    return {
        title: "Chỉnh sửa " + product.name,
        description: product.description
    }
}


export default async function page({ params }: { params: { id: string } }) {//Params lấy ra từ Props

    let product = undefined;
    try {
        const { payload } = await getDetail(Number(params.id))
        product = payload.data
    } catch (err) {

    }

    return (
        <div>
            <h1 className='text-center'> {product ? (<>Cập nhật sản phẩm</>) : (<>Không tìm thấy sản phẩm</>)}</h1>
            <div className='flex items-center justify-center w-full'>
                <ProductAddForm product={product} />
            </div>
        </div>
    )
}
