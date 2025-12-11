import ICurriculumService from "./interfaces/ICurriculumService.js";
import { Curriculum } from "db";
import ICurriculumRepository from "../repositories/interfaces/ICurriculumRepository.js";
import Service from "./Service.js";
import { validateService } from "../decorators/errors/errors.js";
import {
  GetCurriculumForRolDTO,
  curriculum_mapper,
} from "../types/DTOs/CurriculumDTO.js";
import { toUser } from "../utils/mapper/ForUserRol.js";

export class CurriculumService
  extends Service<Curriculum>
  implements ICurriculumService
{
  constructor(private readonly CurriculumRepository: ICurriculumRepository) {
    super(CurriculumRepository, "Curriculum");
  }

  @validateService("Curriculum not found: ")
  public async findByName(name: string): Promise<GetCurriculumForRolDTO[]> {
    const curriculums = (await this.CurriculumRepository.findByName(
      name
    )) as Curriculum[];

    return toUser<GetCurriculumForRolDTO, Curriculum, typeof curriculum_mapper>(
      curriculums as Curriculum[],
      curriculum_mapper
    );
  }

  @validateService("Curriculums not found: ")
  public async findAllInUserId(
    userId: number
  ): Promise<GetCurriculumForRolDTO> {
    const curriculums = await this.CurriculumRepository.findAllInUserId(userId);

    return toUser<GetCurriculumForRolDTO, Curriculum, typeof curriculum_mapper>(
      curriculums as Curriculum[],
      curriculum_mapper
    ).then((curriculum) => curriculum[0]);
  }
}
