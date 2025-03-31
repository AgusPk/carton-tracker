import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@auth0/nextjs-auth0/edge'

const protectedRoutes = ['/home']
const publicRoutes = ['/']

export default async function authMiddleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const session = await getSession(req, new NextResponse())

  if (isProtectedRoute && !session?.user) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  if (
    isPublicRoute &&
    session?.user &&
    !req.nextUrl.pathname.startsWith('/home')
  ) {
    return NextResponse.redirect(new URL('/home', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
 