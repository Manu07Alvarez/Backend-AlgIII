import { validateRepo } from "../decorators/errors/errors";
import { temasRepositories } from "../repositories/TemasRepositories";


export class TemaService {
    private temasRepositories: any;

    constructor() {
        this.temasRepositories = new temasRepositories();
    }
    async getTema(id: number | null = null) {
        
    }

    @validateRepo
    async BajaTema() {
        return await this.temasRepositories.BajaTema();
    }
}

