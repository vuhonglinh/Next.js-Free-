import authApiRequest from "@/api.request/auth";
import { HttpError } from "@/lib/http";
import { cookies } from "next/headers";

export async function POST(request: Request) {

    const res = await request.json();
    const force = res.force as boolean | undefined;
    if (force) {//sessionToken hết hạn
        return Response.json({
            message: "Buộc đăng xuất thành công",
        }, {
            status: 200,
            headers: {
                //Xóa cookie
                'Set-Cookie': 'sessionToken=; Path=/; HttpOnly=false; Max-Age=0'
            }
        });
    }

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
        const result = await authApiRequest.logoutFormNextServerToServer(sessionToken.value);
        return Response.json(result.payload, {
            status: 200,
            headers: {
                //Xóa cookie
                'Set-Cookie': 'sessionToken=; Path=/; HttpOnly=false; Max-Age=0'
            }
        });
    } catch (err) {
        if (err instanceof HttpError) {
            return Response.json({
                message: "Lỗi không xác định"
            }, {
                status: 500
            })
        }
    }
}
