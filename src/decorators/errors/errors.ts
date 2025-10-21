
import * as Prisma from "db";
import errLogger from "../../utils/logging/Logger.js";
import { NoResultError } from "kysely";
export function validateRepo<This, Args extends unknown[], Return>(
  target: (this: This, ...args: Args) => Promise<Return>, 
) {
   return async function (this: This, ...args: Args): Promise<Return> {
     try {
       return await target.call(this, ...args);
     } catch (error: unknown) {
        if (error instanceof Prisma.Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            errLogger.error(`ERROR 💥 ${error.code} ${error.message} ${error.cause}`);
            throw new Error("Registro no encontrado");
          }
          errLogger.error("ERROR 💥 " + error.code + "" + error.message  + (error.meta ? " " + JSON.stringify(error.meta) : ""));
          throw new Error(getLastLine(error.message));
        };
        if (error instanceof Prisma.Prisma.PrismaClientValidationError) {
          errLogger.error("ERROR 💥 " + error.name + " " + error.message);
          throw new Error(getLastLine(error.message));
        };
        if (error instanceof NoResultError) {
          errLogger.error("ERROR 💥 " + error.name + " " + error.message);
          throw new Error("Registro no encontrado");
        };
        if (error instanceof Error) { 
          errLogger.error("ERROR 💥 " + error.name + " " + error.message + " " + error.stack + " " + error.cause);
          throw new Error(getLastLine(error.message));
        };
        errLogger.error("ERROR 💥 " + error);
        throw error
     }
   };
}

export function validateService(headerMessage: string) {
  return function actualDecor<This extends { name: string }, Args extends unknown[], Return>(
    target: (this: This, ...args: Args) => Promise<Return>,
  ) {
    return async function (this: This, ...args: Args): Promise<Return> {
      try {
        return await target.call(this, ...args);
      } catch (error: unknown) {
          if (error instanceof Error) {
            errLogger.error("ERROR 💥 " + error);
            throw new Error(`${this.name} ${headerMessage} ${error.message}`);
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

