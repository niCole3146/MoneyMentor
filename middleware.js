/*
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      // Protect all API routes
      if (req.nextUrl.pathname.startsWith("/api/")) {
        return !!token;
      }
      
      // List of public pages that don't require authentication
      const publicPages = ['/', '/about', '/features', '/contact'];
      const isPublicPage = publicPages.includes(req.nextUrl.pathname);
      
      // Allow access to public pages, require auth for all others
      return isPublicPage || !!token;
    },
  },
  pages: {
    signIn: '/', // Redirect to root page instead of default sign-in page
  },
});

export const config = {
  matcher: [
    // Match all paths except static files and api routes
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 
*/

import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      // List of unprotected API routes
      const publicApiRoutes = [
        '/api/user/budget',
        '/api/user/transaction', // Ensure middleware handles 'name' field in transactions
        // Add other public API routes here
      ];
      
      // Bypass auth for specific API routes
      if (publicApiRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
        return true;
      }
      
      // Protect all other API routes
      if (req.nextUrl.pathname.startsWith("/api/")) {
        return !!token;
      }
      
      // Rest of your existing logic...
      const publicPages = ['/', '/about', '/features', '/contact'];
      const isPublicPage = publicPages.includes(req.nextUrl.pathname);
      return isPublicPage || !!token;
    },
  },
  pages: {
    signIn: '/',
  },
});

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};