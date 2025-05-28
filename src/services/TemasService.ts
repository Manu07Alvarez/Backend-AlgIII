import { validateRepo } from "../decorators/errors/errors";
import { temasRepositories } from "../repositories/TemasRepositories";


export class TemaService {
    private temasRepositories: any;

    constructor() {
        this.temasRepositories = new temasRepositories();
    }
    @validateRepo
    async getTema(){
        return await this.temasRepositories.getTema();
    }
}

