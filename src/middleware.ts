import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
export { default } from "next-auth/middleware";

// export default withAuth(
//   function middleware(req) {
//     const { pathname } = req.nextUrl;

//     // Si el usuario está autenticado y visita rutas como /auth/login
//     if (req.nextauth.token && pathname.startsWith("/auth/login")) {
//       const url = req.nextUrl.clone();
//       url.pathname = "/"; // Redirige al home
//       return NextResponse.redirect(url);
//     }

//     return NextResponse.next(); // Continúa si no coincide con las reglas
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token, // Usuario autorizado si tiene token
//     },
//   }
// );

// Configuración de las rutas protegidas
export const config = {
  matcher: ["/resources/:path*", "/upload/:path*", "/profile/:path*"],
};
