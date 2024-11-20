// // import bcrypt from "bcryptjs";
// // import { NextResponse } from "next/server";
// // import prisma from "@/libs/prisma";

// // export async function POST(request: Request) {
// //   try {
// //     const data = await request.json();

// //     const userFound = await prisma.usuario.findUnique({
// //       where: {
// //         email: data.email,
// //       },
// //     });

// //     if (userFound) {
// //       return NextResponse.json(
// //         {
// //           message: "Email already in use",
// //         },
// //         {
// //           status: 400,
// //         }
// //       );
// //     }

// //     const usernameFound = await prisma.usuario.findUnique({
// //       where: {
// //         username: data.username,
// //       },
// //     });

// //     if (usernameFound) {
// //       return NextResponse.json(
// //         {
// //           message: "Username already in use",
// //         },
// //         {
// //           status: 400,
// //         }
// //       );
// //     }

// //     console.log(data);
// //     const hashedPassword = await bcrypt.hash(data.password, 10);
// //     const newUser = await prisma.usuario.create({
// //       data: {
// //         username: data.username,
// //         email: data.email,
// //         password: hashedPassword,
// //       },
// //     });

// //     const { password: _, ...User } = newUser;

// //     return NextResponse.json(User);
// //   } catch (error: any) {
// //     return NextResponse.json(
// //       {
// //         message: error.message,
// //       },
// //       {
// //         status: 500,
// //       }
// //     );
// //   }
// // }

// // pages/api/auth/register.ts

// import { NextRequest, NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import prisma from "@/libs/prisma";

// export async function POST(req: NextRequest) {
//   const {
//     email,
//     username,
//     password,
//   }: {
//     email: string;
//     username: string;
//     password: string;
//   } = await req.json();

//   // Validaciones
//   if (!email || !username || !password) {
//     return NextResponse.json(
//       { error: "Todos los campos son requeridos" },
//       { status: 400 }
//     );
//   }

//   // Verificar si el usuario ya existe
//   const existingUser = await prisma.usuario.findUnique({
//     where: { email },
//   });

//   if (existingUser) {
//     return NextResponse.json(
//       { error: "Este correo electrónico ya está registrado" },
//       { status: 409 }
//     );
//   }

//   try {
//     // Encriptar la contraseña con bcrypt
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Crear un nuevo usuario en la base de datos
//     const newUser = await prisma.usuario.create({
//       data: {
//         email,
//         username,
//         password: hashedPassword,
//       },
//     });

//     // Enviar una respuesta exitosa con el usuario creado
//     return NextResponse.json(
//       {
//         message: "Usuario creado con éxito",
//         user: {
//           id: newUser.id,
//           email: newUser.email,
//           username: newUser.username,
//           tipoUsuario: newUser.tipoUsuario,
//         },
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error al registrar el usuario:", error);
//     return NextResponse.json(
//       { error: "Error interno del servidor" },
//       { status: 500 }
//     );
//   }
// }
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(request: Request) {
  try {
    const data = await request.json();

    const userFound = await prisma.usuario.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userFound) {
      return NextResponse.json(
        {
          message: "Email already in use",
        },
        {
          status: 400,
        }
      );
    }

    // console.log(data);
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const newUser = await prisma.usuario.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    const { password: _, ...User } = newUser;

    return NextResponse.json(User);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
