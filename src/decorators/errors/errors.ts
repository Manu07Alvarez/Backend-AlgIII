import { Prisma } from "../../../generated/prisma/client";

export function validateRepo<This, Args extends unknown[], Return>(
  target: (this: This, ...args: Args) => Promise<Return>, 
) {
   return async function (this: This, ...args: Args): Promise<Return> {
     try {
       return await target.call(this, ...args);
     } catch (error: unknown) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          console.error("ERROR 💥 " + error.code + "" + error.message  + (error.meta ? " " + JSON.stringify(error.meta) : ""));
          throw new Error("ERROR 💥 " + getLastLine(error.message));
        };
        
        if (error instanceof Prisma.PrismaClientValidationError) {
          console.error("ERROR 💥 " + error.name + " " + error.message);
          throw new Error("ERROR 💥 " + error.name + " " + error.message);
        }
        throw error;
     }
   };
}

function getLastLine(text: string): string {
  const lines = text.trim().split('\n');
  return lines[lines.length - 1].trim();
}

export function handlerError<This, Args extends unknown[], Return>(
  target: (this: This, ...args: Args) => Promise<Return>,
) {
   return async function (this: This, ...args: Args): Promise<Return> {
     try {
       return await target.call(this, ...args);
     } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error("ERROR 💥");
        }
        throw error;
     }
   };
}
