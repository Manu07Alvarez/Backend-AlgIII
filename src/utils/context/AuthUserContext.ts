import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@zenstackhq/runtime';
import { DefaultArgs } from 'db/runtime/client.js';
import { AsyncLocalStorage } from 'node:async_hooks';
import { AuthUserDTO } from 'types/DTOs/UsuariosDTO.js';

interface AuthContext{
  user: AuthUserDTO | undefined;
  db: PrismaClient<{
    adapter: PrismaPg;
    }, never, DefaultArgs>;
}

export const auth_context =  new AsyncLocalStorage<AuthContext>

export function getAuth(): AuthContext {
  const store = auth_context.getStore();
  if (!store) {
    throw new Error("Contexto no inicializado");
  } 
  return store;
}