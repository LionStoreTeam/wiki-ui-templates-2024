import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

prisma.$use(async (params, next) => {
  if (params.model === "Usuario" && params.action === "create") {
    if (params.args.data.password) {
      const hashedPassword = await hash(params.args.data.password, 12);
      params.args.data.password = hashedPassword;
    }
  }
  return next(params);
});

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

export default prisma;
