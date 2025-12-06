import { Curriculum } from "db";
export default interface ICurriculumRepository {
  create(data: Curriculum): Promise<void>;
  findAllInUserId(userId: number): Promise<Partial<Curriculum>[]>;
  findByName(name: string): Promise<(Curriculum | undefined)[]>;
  update(id: number, data: Curriculum): Promise<void>;
  delete(id: number): Promise<void>;
}