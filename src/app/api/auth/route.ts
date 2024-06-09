export async function POST(request: Request) {
    const res = await request.json();
    //Lấy token bên phía server trả về
    const clientSessionToken = res.clientSessionToken
    if (!clientSessionToken) {
        return Response.json({
            message: "Không nhận được session token"
        }, {
            status: 400
        })
    }
    return Response.json(res, {
        status: 200,
        headers: {
            'Set-Cookie': `clientSessionToken=${clientSessionToken}; Path=/; HttpOnly=true`
        }
    });
}