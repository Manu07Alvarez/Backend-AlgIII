import { GetCurriculumForRolDTO } from "types/DTOs/CurriculumDTO.js";
import { Curriculum } from "db";

export default interface ICurriculumService {
    findById(id: number): Promise<GetCurriculumForRolDTO>;
    findAllInUserId(userId: number): Promise<GetCurriculumForRolDTO[]>;
    create(data: Partial<Curriculum>): Promise<void>;
    activateOrDeactivate(id: number): Promise<void>;
    delete(id: number): Promise<void>;
    update(id: number, data: Partial<Curriculum>): Promise<void>;
}