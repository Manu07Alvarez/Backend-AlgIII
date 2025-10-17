import { Mensaje } from 'db';
export default interface IMensajesRepository {
  create(data: Mensaje): Promise<void>;
  findById(id: number): Promise<Partial<Mensaje>>;
  messagesResponded(messageId: number): Promise<Partial<Mensaje[]>>;
  findAllInPost(postId: number): Promise<Partial<Mensaje[]>>;
  findAllInUserId(userId: number, postId: number): Promise<Partial<Mensaje[]>>;
  activateOrDeactivate(id: number): Promise<void>;
  update(id: number, data: Mensaje): Promise<void>;
  delete(id: number): Promise<void>;
}