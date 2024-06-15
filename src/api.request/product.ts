import { ProductListResType, ProductResType } from './../schemaValidations/product.schema';
import http from "@/lib/http";
import { MessageResType } from '@/schemaValidations/common.schema';
import { CreateProductBodyType } from "@/schemaValidations/product.schema";

const productApiRequest = {
    getList: () => {
        return http.get<ProductListResType>('/products', {
            cache: 'no-store'///trình duyệt sẽ đảm bảo rằng yêu cầu này không được lưu trữ trong bộ nhớ đệm và luôn luôn truy xuất dữ liệu trực tiếp từ máy chủ.
        })
    },
    getDetail: (id: number) => {
        return http.get<ProductResType>(`products/${id}`, {
            cache: 'no-store'///trình duyệt sẽ đảm bảo rằng yêu cầu này không được lưu trữ trong bộ nhớ đệm và luôn luôn truy xuất dữ liệu trực tiếp từ máy chủ.
        })
    },
    create: (body: CreateProductBodyType) => {
        return http.post<ProductResType>('/products', body)
    },
    update: (id: number, body: CreateProductBodyType) => {
        return http.put<ProductResType>(`/products/${id}`, body)
    },
    delete: (id: number) => {
        return http.delete<MessageResType>(`/products/${id}`)
    },
    uploadImgae: (body: FormData) => {
        return http.post<{ message: string, data: string }>('/media/upload', body)
    }
}


export default productApiRequest;