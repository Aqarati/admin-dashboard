import next from 'next';
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { verifyToken } from './lib/jwtLib';

const secret_key = process.env.JWT_SECRET as string;
const jwt_expiration = process.env.JWT_EXPIRATION as string;

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/auth') && request.cookies.has("token")) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        const token: any = request.cookies.get("token");

        if (!token) {
            return NextResponse.redirect(new URL("/auth", request.url));
        }

        if (!verifyToken(token.value, secret_key)) {
            return NextResponse.redirect(new URL("/auth", request.url));
        }
    }

    return NextResponse.next();
}