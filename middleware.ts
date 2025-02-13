import authConfig from "@/auth.config"
import NextAuth from "next-auth"
import { MiddlewareConfig } from "next/server"
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./routes"

const { auth } = NextAuth(authConfig)
export default auth(function middleware(req) {
  const isAuthenticated = !!req.auth
  const { nextUrl } = req
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isAPIAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)

  if (isAPIAuthRoute) {
    return
  }

  if (isAuthRoute) {
    if (isAuthenticated) {
      return Response.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)
      )
    }
    return
  }

  if (!isAuthenticated && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl))
  }
  return
})

export const config: MiddlewareConfig = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
