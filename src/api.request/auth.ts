import { LoginResType, RegisterBodyType, RegisterResType, SlideSessionResType } from './../schemaValidations/auth.schema';
import http from "@/lib/http";
import { LoginBodyType } from "@/schemaValidations/auth.schema";
import { MessageResType } from '@/schemaValidations/common.schema';

const authApiRequest = {
    login: (body: LoginBodyType) => {
        return http.post<LoginResType>('/auth/login', body)
    },

    register: (body: RegisterBodyType) => {
        return http.post<RegisterResType>('/auth/register', body)
    },

    auth: (body: { sessionToken: string, expiresAt: string }) => {
        return http.post<Response>('/api/auth', body, {
            baseUrl: ''
        })
    },

    //Từ next serve gọi lên server backend
    logoutFormNextServerToServer: (sessionToken: string) => {
        return http.post<MessageResType>('/auth/logout', {}, {
            headers: {
                'Authorization': 'Bearer ' + sessionToken
            }
        })
    },

    //Từ next client gọi lên server backend
    //Logout trên client sẽ vào thằng này
    logoutFormNextClientToServer: () => {
        return http.post<MessageResType>('/api/auth/logout', {}, {
            baseUrl: ''
        })
    },

    slideSessionFormNextServerToServer: (sessionToken: string) => {
        return http.post<SlideSessionResType>('auth/slide-session', {}, {
            headers: {
                'Authorization': 'Bearer ' + sessionToken
            }
        })
    },
    slideSessionFormNextClientToServer: () => {
        return http.post<SlideSessionResType>('/api/auth/slide-session', {}, { baseUrl: '' })
    }
}


export default authApiRequest