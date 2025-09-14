// // middleware.ts
// import { withAuth } from 'next-auth/middleware';
// import { NextResponse } from 'next/server';

// export default withAuth(
//   function middleware(req) {
//     const token = req.nextauth.token;
//     const { pathname } = req.nextUrl;

//     // Define protected and public pages
//     const protectedPages = ['/manage/:path*'];
//     const publicPages = ['/login', '/register'];

//     // Check if the current path is a protected page
//     const isProtectedPage = protectedPages.some(pattern =>
//       new RegExp(pattern.replace('*', '.*').replace(':path*', '.*')).test(pathname)
//     );

//     // Check if the current path is a public page
//     const isPublicPage = publicPages.includes(pathname);

//     // If user is not authenticated and tries to access a protected page, redirect to /login
//     if (!token && isProtectedPage) {
//       console.log('User is not authenticated, redirecting to /login...');
//       return NextResponse.redirect(new URL('/login', req.url));
//     }

//     // If user is authenticated and tries to access public pages like /login or /register, redirect to homepage
//     if (token && isPublicPage) {
//       console.log('User is already authenticated, redirecting from login/register to homepage...');
//       return NextResponse.redirect(new URL('/', req.url));
//     }

//     // If neither of the above conditions are met, allow the request to proceed
//     console.log('Request skipped, allowing to proceed...');
//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => {
//         // This is required for withAuth to work, but we handle authorization in the function above
//         return true;
//       },
//     },
//   }
// );

// // Configure matcher to apply the middleware to relevant routes
// export const config = {
//   matcher: ['/manage/:path*', '/login', '/register'],
// };

// middleware.ts
export { default } from 'next-auth/middleware';

// Configure matcher to apply the middleware to protected routes
export const config = {
  matcher: ['/manage/:path*'],
};