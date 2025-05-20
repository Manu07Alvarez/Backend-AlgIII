import { Prisma } from "../../../generated/prisma/client";

export function validateRepo<This, Args extends unknown[], Return>(
  target: (this: This, ...args: Args) => Promise<Return>, 
) {
   return async function (this: This, ...args: Args): Promise<Return> {
     try {
       return await target.call(this, ...args);
     } catch (error: unknown) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          console.error("ERROR 💥 " + error.code + error.cause + error.message);
          throw new Error("ERROR 💥 " + error.code + error.message);
        }
        if (error instanceof Prisma.PrismaClientValidationError) {
          console.error("ERROR 💥 " + error.name + " " + error.cause + " " + error.message);
          throw new Error("ERROR 💥 " + error.name + " " + error.cause + " " + error.message, {cause: error.cause});
        }
        throw error;
     }
   };
}

