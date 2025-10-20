import {Post} from 'db';

export type GetPostForUserDTO = {
    createdAt: Date | null;
    titulo: string;
    contenido: string;
    id_tema: number;
    id_autor: number;
    id: number;
} 
export type GetPostForAdminDTO = {
    updatedAt: Date | null;
    published: boolean;
} & GetPostForUserDTO;

export type GetPostForRolDTO = GetPostForAdminDTO | GetPostForUserDTO

export const post_mapper = {
    USER: (post: Post): GetPostForUserDTO => ({
        id: post.id,
        titulo: post.titulo,
        id_autor: post.id_autor,
        id_tema: post.id_tema,
        contenido: post.contenido,
        createdAt: post.createdAt
    }),
    ADMIN: (post: Post): GetPostForAdminDTO => ({
        id: post.id,
        titulo: post.titulo,
        id_autor: post.id_autor,
        id_tema: post.id_tema,
        contenido: post.contenido,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        published: post.published
    }),
    MODERADOR: (post: Post): GetPostForAdminDTO => ({
        id: post.id,
        titulo: post.titulo,
        id_autor: post.id_autor,
        id_tema: post.id_tema,
        contenido: post.contenido,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        published: post.published
    })
} as const;