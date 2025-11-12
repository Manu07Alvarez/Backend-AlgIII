import { Curriculum } from "db";
export default interface ICurriculumRepository {
    create(data: Curriculum): Promise<void>;
    findAll(): Promise<Partial<Curriculum[]>>;
    findAllInUserId(userId: number): Promise<Curriculum[]>;
    activateOrDeactivate(id: number): Promise<void>;
    update(id: number, data: Curriculum): Promise<void>;
    delete(id: number): Promise<void>;
}