import { getAuth } from '../context/AuthUserContext.js';
export async function toUser<O,I, T extends Record<string, (user: I) => O>>(data: I | I[], mapper_obj: T): Promise<O[]> {
    const {user} = getAuth();
    if (Array.isArray(data) === false) {
        data = [data];
    }
    if (!user?.rol) return data.map(mapper_obj.USER);
    const mapper = mapper_obj[user.rol as keyof typeof mapper_obj];
    if (!mapper) throw new Error('Unauthorized');
    return data.map(mapper);
}