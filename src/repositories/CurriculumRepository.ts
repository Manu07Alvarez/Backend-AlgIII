import Repository from "./Repository.js";
import { PrismaClient, Curriculum } from "db";
import { validateRepo } from "../decorators/errors/errors.js";
import iCurriculumRepository from "./interfaces/ICurriculumRepository.js";

export default class CurriculumRepository
  extends Repository<Curriculum, "curriculum">
  implements iCurriculumRepository
{
  constructor() {
    super("curriculum");
  }

  @validateRepo
  async findAllInUserId(userId: number): Promise<Curriculum[]> {
    return super["db"].findMany({
      where: { id_autor: userId },
    });
  }

  @validateRepo
  async findByName(name: string): Promise<(Curriculum | undefined)[]> {
    const result = await super["db"].findMany({
      where: {
        nombre: {
          contains: name,
          mode: "insensitive",
        },
      },
    });

    // La clase base espera (Curriculum | undefined)[]
    return result.map((c) => c ?? undefined);
  }

  @validateRepo
  async update(id: number, data: Curriculum): Promise<void> {
    await super["db"].update({
      where: { id },
      data,
    });
  }

  @validateRepo
  async delete(id: number): Promise<void> {
    await super["db"].delete({
      where: { id },
    });
  }
}
