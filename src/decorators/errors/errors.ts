import * as Prisma from "../../../generated/prisma/client.js";
import errLogger from "../../utils/logging/Logger.ts";
export function validateRepo<This, Args extends unknown[], Return>(
  target: (this: This, ...args: Args) => Promise<Return>, 
) {
   return async function (this: This, ...args: Args): Promise<Return> {
     try {
       return await target.call(this, ...args);
     } catch (error: unknown) {
        if (error instanceof Prisma.Prisma.PrismaClientKnownRequestError) {
          errLogger.error("ERROR 💥 " + error.code + "" + error.message  + (error.meta ? " " + JSON.stringify(error.meta) : ""));
          throw new Error(getLastLine(error.message));
        };
        if (error instanceof Prisma.Prisma.PrismaClientValidationError) {
          errLogger.error("ERROR 💥 " + error.name + " " + error.message);
          throw new Error(getLastLine(error.message));
        };
        if (error instanceof Error) { 
          errLogger.error("ERROR 💥 " + error);
          throw new Error(getLastLine(error.message));
        };
        errLogger.error("ERROR 💥 " + error);
        throw error
     }
   };
}

export function validateService(headerMessage: string) {
  return function actualDecor<This, Args extends unknown[], Return>(
    target: (this: This, ...args: Args) => Promise<Return>,
  ) {
    return async function (this: This, ...args: Args): Promise<Return> {
      try {
        return await target.call(this, ...args);
      } catch (error: unknown) {
          if (error instanceof Error) {
            errLogger.error("ERROR 💥 " + error);
            throw new Error(`${headerMessage} ${error.message}`);
          }
          throw error;
      }
    };
  }
}

function getLastLine(text: string): string {
  const lines = text.trim().split('\n');
  return lines[lines.length - 1].trim();
}

