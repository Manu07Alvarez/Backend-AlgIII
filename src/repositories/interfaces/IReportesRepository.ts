import { Reporte } from "../../generated/prisma/client.js";
export default interface IReporteRepository {
    create(data: Reporte, id_type: number): Promise<void>;
    findById(id: string): Promise<Partial<Reporte>>;
    findAll(): Promise<Reporte[]>;
    findAllMessages(): Promise<Reporte[]>;
    findAllPosts(): Promise<Reporte[]>;
    findAllTopics(): Promise<Reporte[]>;
    findAllUsers(): Promise<Reporte[]>;
    resolve(id: string): Promise<void>;
    update(id: string, data: Reporte): Promise<void>;
    delete(id: string): Promise<void>;
}
