import ICurriculumService from "./interfaces/ICurriculumService.js";
import { Curriculum } from "db";
import ICurriculumRepository from "../repositories/interfaces/ICurriculumRepository.js";
import service from "./Service.js";
import { validateService } from "../decorators/errors/errors.js";
import { GetCurriculumForRolDTO, curriculum_mapper } from "../types/DTOs/CurriculumDTO.js";
import { toUser } from "../utils/mapper/ForUserRol.js";     
import { validate } from "@zenstackhq/runtime";

export class CurriculumService extends service<Curriculum> implements ICurriculumService {
    constructor(
        private readonly CurriculumRepository: ICurriculumRepository,
    ) {
        super(CurriculumRepository, 'Curriculum');
    } 
    @validateService('Curriculum not found: ')
    public async findById(id: number): Promise<GetCurriculumForRolDTO> {
        const curriculum = await this.CurriculumRepository.findById(id) as Curriculum
        return await toUser<GetCurriculumForRolDTO, Curriculum, typeof curriculum_mapper>(curriculum, curriculum_mapper);
    }
    @validateService('Curriculum not found: ')
    public async findAllInUserId(userId: number): Promise<GetCurriculumForRolDTO[]> {
        const curriculum = await this.CurriculumRepository.findAllInUserId(userId) as Curriculum[];
        return await toUser<GetCurriculumForRolDTO[], Curriculum, typeof curriculum_mapper>(curriculum, curriculum_mapper).then(curriculums => curriculums[0]);
    }

}

