import envConfig from "@/config";
import { LoginBodyType, LoginResType } from "@/schemaValidations/auth.schema";

type CustomOptions = Omit<RequestInit, 'method'> & {
    baseUrl?: string
}


const ENTITY_ERROR_STATUS = 422
type EntityErrorPayload = {
    message: string,
    errors: {
        field: string,
        message: string
    }[]
}

class HttpError extends Error {
    status: number;
    payload: {
        massage: string,
        [key: string]: string // Ngoài message: string còn có các key, value string khác
    };
    constructor({ status, payload }: { status: number, payload: any }) {
        super('Http Error')
        this.status = status
        this.payload = payload
    }
}

export class EntityError extends HttpError {
    status: 422
    payload: { [key: string]: string; massage: string; };
}

class SessionToken {
    private token = ''
    get value() {
        return this.token
    }
    set value(token: string) {
        //Nếu gọi method ở server thì sẽ bị lỗi
        //Trong môi trường server-side (như khi sử dụng Next.js để render trang trên server), đối tượng window không tồn tại
        if (typeof window === 'undefined') {
            throw new Error("Cannot set token on server side")
        }
        this.token = token
    }
}

export const clientSessionToken = new SessionToken()

const request = async <Response>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, options?: CustomOptions | undefined) => {
    const body = options?.body ? JSON.stringify(options.body) : undefined
    const baseHeaders = {
        'Content-Type': 'application/json',
        'Authorization': clientSessionToken.value ? 'Bearer ' + clientSessionToken.value : ''
    }

    const baseUrl = options?.baseUrl === undefined ? envConfig.NEXT_PUBLIC_API_ENDPOINT : options?.baseUrl
    const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`

    const res = await fetch(fullUrl, {
        ...options,
        headers: { ...baseHeaders, ...options?.headers },
        body,
        method
    })


    const payload: Response = await res.json()

    const data = {
        status: res.status,
        payload
    }

    if (!res.ok) {
        throw new HttpError(data)
    }
    //Trả về thành công
    if (['/auth/login', '/auth/register'].includes(url)) {
        clientSessionToken.value = (payload as LoginResType).data.token
    } else if ('/auth/logout'.includes(url)) {
        clientSessionToken.value = ''
    }
    return data
}



const http = {
    //Gọi phương thức GET
    get<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<Response>('GET', url, options)
    },

    //Gọi phương thức POST
    post<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<Response>('POST', url, { ...options, body })
    },

    //Gọi phương thức PUT
    put<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<Response>('PUT', url, { ...options, body })
    },

    //Gọi phương thức DELETE
    delete<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request<Response>('DELETE', url, { ...options, body })
    },
}

export default http

