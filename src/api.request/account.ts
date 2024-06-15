import http from "@/lib/http"
import { AccountResType, UpdateMeBodyType } from "@/schemaValidations/account.schema"

const accountApiRequest = {
    me: (sessionToken: string) => {
        return http.get<AccountResType>('/account/me', {
            headers: {
                Authorization: 'Bearer ' + sessionToken
            },
        })
    },

    meClient: () => {
        return http.get<AccountResType>('/account/me')
    },
    updateMe: (body: UpdateMeBodyType) => {
        return http.put<AccountResType>('/account/me', body)
    },

}


export default accountApiRequest