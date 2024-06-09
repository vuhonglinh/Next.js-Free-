import http from "@/lib/http"
import { AccountResType } from "@/schemaValidations/account.schema"

const accountApiRequest = {
    me: (clientSessionToken: string) => {
        return http.get<AccountResType>('account/me', {
            headers: {
                Authorization: 'Bearer ' + clientSessionToken
            },
        })
    },

    meClient: () => {
        return http.get<AccountResType>('account/me')
    },

}


export default accountApiRequest