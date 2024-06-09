import { LoginResType, RegisterBodyType, RegisterResType } from './../schemaValidations/auth.schema';
import http from "@/lib/http";
import { LoginBodyType } from "@/schemaValidations/auth.schema";

const authApiRequest = {
    login: (body: LoginBodyType) => {
        return http.post<LoginResType>('/auth/login', body)
    },

    register: (body: RegisterBodyType) => {
        return http.post<RegisterResType>('/auth/register', body)
    },

    auth: (body: { clientSessionToken: string }) => {
        return http.post<Response>('/api/auth', body, {
            baseUrl: ''
        })
    }
}


export default authApiRequest