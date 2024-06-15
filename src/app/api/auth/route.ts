export async function POST(request: Request) {
    const res = await request.json();
    //Lấy token bên phía server trả về
    const sessionToken = res.sessionToken
    const expiresAt = res.expiresAt
    if (!sessionToken) {
        return Response.json({
            message: "Không nhận được session token"
        }, {
            status: 400
        })
    }
    const expiresDate = new Date(expiresAt).toUTCString()
    return Response.json(res, {
        status: 200,
        headers: {
            'Set-Cookie': `sessionToken=${sessionToken}; Path=/; HttpOnly=true; Expires=${expiresDate}; SameSite=Lax;`,
        }
    });
}

