export default interface IRepository<T> {
  create(data: T): Promise<void>;
  findById(id: number): Promise<Partial<T>>;
  findAll(): Promise<T[]>;
  update(id: number, data: T): Promise<void>;
  delete(id: number): Promise<void>;
  findByName(name: string): Promise<Partial<T>>;
  activateOrDeactivate(id: number): Promise<void>;
}