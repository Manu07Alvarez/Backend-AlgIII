import Repository from "./Repository.js";
import { PrismaClient, Curriculum } from 'db';  
import { validateRepo } from "../decorators/errors/errors.js";
import iCurriculumRepository from "./interfaces/ICurriculumRepository.js"

export default class CurriculumRepository extends Repository<Curriculum, "curriculum"> implements iCurriculumRepository {
    constructor() {
        super("curriculum");
    } 
    findAllInUserId(userId: number): Promise<Curriculum[]> {
        throw new Error("Method not implemented.");
    }}