import { Mensaje } from '../../../generated/prisma/client.ts';
export default interface IMensajesRepository {
  create(data: Mensaje): Promise<void>;
  findById(id: number): Promise<Partial<Mensaje>>;
  findAllInPost(postId: number): Promise<Mensaje[]>;
  findAllInUserId(userId: number, postId: number): Promise<Mensaje[]>;
  activateOrDeactivate(id: number): Promise<void>;
  update(id: number, data: Mensaje): Promise<void>;
  delete(id: number): Promise<void>;
}