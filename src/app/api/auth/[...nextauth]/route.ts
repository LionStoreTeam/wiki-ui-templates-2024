// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../../../lib/prisma";

const handler = NextAuth({
  // adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          // prompt: "consent",
          // access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        id: { label: "id", type: "text" },
        name: { label: "name", type: "text" },
        tipoUsuario: { label: "tipoUsuario", type: "text" },
        email: {
          label: "Email",
          type: "email",
          placeholder: "someemail@email.com",
          autocomplete: "off",
        },
        password: { label: "Password", type: "password", autocomplete: "off" },
      },
      async authorize(credentials: any): Promise<{
        id: string;
        name: string;
        email: string;
        tipoUsuario: string;
      }> {
        const userFound = await prisma.usuario.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!userFound) throw new Error("Usuario no encontrado");

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          userFound.password
        );

        if (!passwordMatch) throw new Error("Contraseña incorrecta");

        return {
          id: userFound.id.toString(),
          name: userFound.name,
          email: userFound.email,
          tipoUsuario: userFound.tipoUsuario,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Verifica si el usuario ya existe
      const existingUser = await prisma.usuario.findUnique({
        where: { email: user.email || "" },
      });

      if (!existingUser) {
        // Crea un nuevo usuario en la tabla Usuario de Prisma
        await prisma.usuario.create({
          data: {
            id: user.id, // Asegúrate de usar el ID de NextAuth para mantener la coherencia
            name: user.name || "", // Usa el nombre proporcionado
            email: user.email || "",
            password: "", // No lo usamos aquí porque el usuario no se registra manualmente
            tipoUsuario: "NORMAL", // Asigna NORMAL por defecto
          },
        });
      }
      return true;
    },

    async session({ session, user }) {
      // Agrega información adicional a la sesión
      if (user) {
        const dbUser = await prisma.usuario.findUnique({
          where: { id: user.id },
        });
        session.user.tipoUsuario = dbUser?.tipoUsuario || "NORMAL";
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login", // Personaliza tu página de inicio de sesión
    error: "/auth/error", // Personaliza tu página de error
  },
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, //  días
  },

  secret: process.env.NEXTAUTH_SECRET, // Asegúrate de definir NEXTAUTH_SECRET en tu archivo .env
});
export { handler as GET, handler as POST };
