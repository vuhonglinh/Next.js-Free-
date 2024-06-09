import http from "@/lib/http"
import { AccountResType } from "@/schemaValidations/account.schema"

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

}


export default accountApiRequest