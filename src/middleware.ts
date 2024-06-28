import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
    const token = context.cookies.get('token')?.value;

    if (!token && context.url.pathname !== "/") {
        return Response.redirect(new URL("/", context.url));
    } else if (token && context.url.pathname === "/") {
        return Response.redirect(new URL("/home", context.url));
    }

    return next();
});
