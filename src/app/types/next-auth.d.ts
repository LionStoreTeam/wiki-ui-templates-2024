import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string;
      tipoUsuario: "NORMAL" | "DESARROLLADOR" | string;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    tipoUsuario: "NORMAL" | "DESARROLLADOR" | string;
  }
}
// // Extiende el tipo JWT para incluir los campos que se serializan en el token.
// declare module "next-auth/jwt" {
//   interface JWT {
//     id: string;
//     tipoUsuario: "NORMAL" | "DESARROLLADOR"; // Tipo específico
//     email: string;
//     nombre: string;
//   }
// }
// next-auth.d.ts
