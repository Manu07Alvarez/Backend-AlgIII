export default interface IRepository<T> {
  create(data: T): Promise<void>;
  findAll(): Promise<T[]>;
  findByUserId(userId: number, postId: number): Promise<T[]>;
  update(id: number, data: T): Promise<void>;
  delete(id: number): Promise<void>;
}