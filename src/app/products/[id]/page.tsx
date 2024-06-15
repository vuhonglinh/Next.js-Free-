import productApiRequest from "@/api.request/product"
import Image from "next/image";
import type { Metadata, ResolvingMetadata } from 'next'
import { cache } from "react";
import envConfig from "@/config";
import { baseOpenGraph } from "@/app/shared-metadata";


const getDetail = cache(productApiRequest.getDetail)

export async function generateMetadata(
    { params }: { params: { id: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const result = await getDetail(Number(params.id))
    const product = result.payload.data
    const url = envConfig.NEXT_PUBLIC_URL + "/products/" + product.id
    return {
        title: product.name,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            url: url,//Url dẫn đến
            siteName: 'Next.js',//Tên website
            images: [
                {
                    url: product.image,
                    width: 800,
                    height: 600,
                },
            ],
            ...baseOpenGraph

        },
        alternates: {
            canonical: url
        }
    }
}

export default async function ProductDetail({ params }: { params: { id: string } }) {
    let product = null;
    try {
        const result = await getDetail(Number(params.id))
        product = result.payload.data
    } catch (err) {

    }
    return (
        <div>
            {!product && <div>Không tìm thấy sản phẩm</div>}
            {
                product && <div>
                    <Image
                        src={product.image}
                        width={180}
                        height={180}
                        alt={product.name}
                        className="w-32 h-32 object-cover"
                    />
                    <div>{product.name}</div>
                    <div>{product.price}</div>
                </div>
            }
        </div>
    )
}
