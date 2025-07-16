/* eslint-disable @typescript-eslint/no-explicit-any */
import { validateRepo } from "../decorators/errors/errors.js";
export default abstract class Repository<T> {
	constructor(protected readonly entity: any) {}

	@validateRepo
	public async update(id: number, data: T): Promise<void> {
		await this.entity.update({
			where: { id: id },
			data
		})
	}
	
	@validateRepo
	public async delete(id: number): Promise<void> {
		await this.entity.delete({
		where: { id }
		})
	}
		
	@validateRepo
	public async activateOrDeactivate(searchId: number): Promise<void> {
		const data = await this.findById(searchId);
		await this.entity.update({
			where: { id: searchId },
			data: {
				activa: !(data as any).activa,
			}
		})
	}

	@validateRepo
	/**
	 * Create a new record in the database
	 * @param data The data to be inserted
	 */
	public async create(data: T): Promise<void> {
		await this.entity.create({data});
	}

	@validateRepo
	public async findAll(): Promise<T[]> {
		return await this.entity.findMany()
	}

	@validateRepo
	public async findById(searchId: number): Promise<Partial<T>> {
		return this.entity.findUniqueOrThrow({
			omit: { 
				createdAt: true, 
				updatedAt: true 
			},
			where: { id: searchId }
		});
	}

	@validateRepo
	
	/**
	 * Finds a record by its name.
	 * 
	 * @param searchNombre - The name to search for.
	 * @returns A promise that resolves with the found record, omitting the createdAt and updatedAt fields.
	 * @throws An error if no record is found.
	 */

	public async findByName(searchNombre: string): Promise<Partial<T>> {
		return this.entity.findUniqueOrThrow({
		omit: { 
			createdAt: true, 
			updatedAt: true 
		},
		where: { nombre: searchNombre }
		});
	}

}