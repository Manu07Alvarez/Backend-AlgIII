/* eslint-disable @typescript-eslint/no-explicit-any */
import { validateService } from "../decorators/errors/errors.js";

export default abstract class Service<T> {

    constructor(protected readonly entity: any, protected readonly name: string) {

    }
;

    @validateService('state not updated: ')
    public async activateOrDeactivate(id: number): Promise<void> {
        await this.entity.activateOrDeactivate(id);
    }

    @validateService('not deleted: ')
    public async delete(id: number): Promise<void> {
        await this.entity.delete(id);
    }

    @validateService('not updated: ')
    public async update(id: number, data: T): Promise<void> {
        await this.entity.update(id, data);
    }
    
    @validateService('not created: ')
    public async create(data: T): Promise<void> {
        await this.entity.create(data);
    }

    @validateService('not found: ')
    public async findByName(searchNombre: string): Promise<Partial<T>> {
        return this.entity.findByName(searchNombre);
    }

    @validateService('not found: ')
    public async findAll(): Promise<T[]> {
        return await this.entity.findAll();
    }

    @validateService('state not found: ')
    public async findById(searchId: number): Promise<Partial<T>> {
        return this.entity.findById(searchId);
    }
}

