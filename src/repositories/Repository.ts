/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuth } from "../utils/context/AuthUserContext.js";
import { validateRepo } from "../decorators/errors/errors.js";
import { PrismaClient } from "@zenstackhq/runtime";
import { ModelKeys } from "../types/EntitysTypes.js";

export default abstract class Repository<T, K extends ModelKeys> {
	constructor(private readonly modelName: K) {}

	private get db () {
		const { db } = getAuth();
		if (!db) {  
			throw new Error("DB no inicializada en el contexto");
		}
		return db[this.modelName];
	}

	private get user(){
		const { user } = getAuth();
		return user;
	}

	@validateRepo
	public async update(id: number, data: T): Promise<void> {
		await (this.db as any).update({
			where: { id: id },
			data
		})
	}
	
	@validateRepo
	public async delete(id: number): Promise<void> {
		await (this.db as any).delete({
		where: { id }
		})
	}
		
	@validateRepo
	public async activateOrDeactivate(searchId: number): Promise<void> {
		const data = await this.findById(searchId);
		await (this.db as any).update({
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
	public async create<U>(data: U): Promise<void> {
		const arrData: U[] = [data];
		console.log(arrData);
		await (this.db as any).createMany({data: arrData});
	}

	@validateRepo
	public async findAll(): Promise<Partial<T[]>> {
		return await (this.db as any).findMany()
	}

	@validateRepo
	public async findById(searchId: number): Promise<Partial<T>> {
		return (this.db as any).findUniqueOrThrow({
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

	public async findByName(searchNombre: string): Promise<Partial<T[]>> {
		return (this.db as any).findMany({
			omit: { 
				createdAt: true, 
				updatedAt: true 
			},
			where: { nombre: { contains: searchNombre} }
		});
	}

}