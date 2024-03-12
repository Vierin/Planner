import { NextRequest, NextResponse } from "next/server";
import { EnumTokens } from "./services/auth-token.service";
import { DASHBOARD_PAGES } from "./config/pages-url.config";

export async function middleware(request: NextRequest, response: NextResponse) {
    const {url, cookies} = request;

    const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value;


    const isDashboardPage = url.includes('/i');
    const isAuthPage = url.includes('/auth');

    if(isAuthPage && refreshToken) {
        return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, url)); // если пользователь авторизован, то перенаправляем его на главную страницу
    }

    if(isAuthPage) {
        return NextResponse.next(); // если пользователь не авторизован, то пропускаем запрос
    }

    if(!refreshToken) {
        return NextResponse.redirect(new URL('/auth', request.url)); // если нет токена, то перенаправляем на страницу авторизации
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/i/:path*', '/auth/:path'] // условия для применения middleware
}