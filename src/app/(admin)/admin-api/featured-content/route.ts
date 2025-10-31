import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';

export async function GET(req: Request) {
    const {username, password} = await req.json();

    //   check  username and password
    if (!username || !password) {
        throw ('Missing username or password');
    }

    const res = await fetch(process.env.API_URL + '/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    });

    if (!res.ok) {
        throw ('Login failed');
    }
    const user = await res.json();

    if (user.access_token) {
        const token = user.access_token;

        // set secure HttpOnly cookie
        (
            await // set secure HttpOnly cookie
            cookies()
        ).set('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60, // 1 hour
        });

        return NextResponse.json({success: true, user});
    }

    return NextResponse.json({success: false}, {status: 401});
}
