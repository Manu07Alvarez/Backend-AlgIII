import { Mensaje } from 'db';
import { GetMensajeForRolDTO, NestedMessage } from 'types/DTOs/MensajesDTO.js';
export default interface IMensajesRepository {
  create(data: Mensaje): Promise<void>;
  findById(id: number): Promise<NestedMessage>;
  findAllInPost(postId: number): Promise<NestedMessage[]>;
  findAllInUserId(userId: number): Promise<Mensaje[]>;
  activateOrDeactivate(id: number): Promise<void>;
  update(id: number, data: Mensaje): Promise<void>;
  delete(id: number): Promise<void>;
}