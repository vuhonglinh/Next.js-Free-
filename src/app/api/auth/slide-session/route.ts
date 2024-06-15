import authApiRequest from "@/api.request/auth";
import { HttpError } from "@/lib/http";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get("sessionToken");
    if (!sessionToken) {
        return Response.json({
            message: "Không nhận được session token"
        }, {
            status: 401
        })
    }

    try {
        const res = await authApiRequest.slideSessionFormNextServerToServer(sessionToken.value);
        const newExpiresDate = new Date(res.payload.data.expiresAt).toUTCString();
        return Response.json(res.payload, {
            status: 200,
            headers: {
                'Set-Cookie': `sessionToken=${sessionToken.value}; Path=/; HttpOnly=true; Expires=${newExpiresDate}; SameSite=Lax; Secure`,
            }
        });
    } catch (err) {
        if (err instanceof HttpError) {
            return Response.json({
                message: err.message,
                status: err.status
            })
        } else {
            return Response.json({
                message: "Lỗi không xác định"
            }, {
                status: 500
            })
        }
    }

}
